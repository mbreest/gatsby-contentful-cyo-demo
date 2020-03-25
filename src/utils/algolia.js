const algoliasearch = require('algoliasearch');
const chunk = require('lodash.chunk');

async function scopedCopyIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.copyIndex(
    sourceIndex.indexName,
    targetIndex.indexName,
    ['settings', 'synonyms', 'rules']
  );
  return targetIndex.waitTask(taskID);
}

async function moveIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.moveIndex(
    sourceIndex.indexName,
    targetIndex.indexName
  );
  return targetIndex.waitTask(taskID);
}

async function indexExists(index) {
  try {
    const { nbHits } = await index.search();
    return nbHits > 0;
  } catch (e) {
    return false;
  }
}

/**
 * TODO: localize index 
 */
async function updateAlgoliaIndex(products, locale) {  
  const appId = process.env.GATSBY_ALGOLIA_APP_ID;
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY;
  const indexName = process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX;

  const client = algoliasearch(appId, apiKey);
         
  const index = client.initIndex(indexName);
  const mainIndexExists = await indexExists(index);
  const tmpIndex = client.initIndex(`${indexName}_tmp`);
  const indexToUse = mainIndexExists ? tmpIndex : index;
  const chunkSize = 1000;
  var settings = null;

  if (mainIndexExists) {
    console.log(`Algolia: copying existing index`);
    await scopedCopyIndex(client, index, tmpIndex);
  }

  console.log(`Algolia: executing query`);     
  const chunks = chunk(products, chunkSize);

  console.log(`Algolia: splitting in ${chunks.length} jobs`);
  const chunkJobs = chunks.map(async function(chunked) {
    const { taskID } = await indexToUse.addObjects(chunked);
    return indexToUse.waitTask(taskID);
  });

  try {
    await Promise.all(chunkJobs);
  } catch (err) {
    console.log(`Algolia: failed `, err);
  }

  if (settings) {
    const { taskID } = await indexToUse.setSettings(settings);
    await indexToUse.waitTask(taskID);
  }

  if (mainIndexExists) {
    console.log(`Algolia: moving copied index to main index`);
    return moveIndex(client, tmpIndex, index);
  }  

  try {
    await Promise.all(jobs);
  } catch (err) {
    console.log(`Algolia: failed to index to Algolia`, err);
  }
}

exports.updateAlgoliaIndex = updateAlgoliaIndex;