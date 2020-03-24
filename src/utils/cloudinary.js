
const baseURL = 'https://res.cloudinary.com/';
const cloudName = 'cyo-demo';

function getImageURL({public_id, cloudName, baseTransformations = [], transformations = [], chained = [], defaults = ['f_auto', 'q_auto'], version = false, format}) {
  const allTransformations = [baseTransformations.join()]
    .concat(transformations.concat(defaults).join())
    .concat(chained)
    .join('/');

  const imagePath = [
    cloudName,
    '/image/upload/',
    allTransformations,
    version ? `/v${version}/` : '/',
    public_id,
    format ? "." + format : ""
  ]
    .join('')
    .replace('//', '/');

  return baseURL + imagePath;
}

function getFluidImage({source, max, aspectRatio = null, breakpoints, crop, gravity, transformations = []}) {  
  const sizes = `(max-width: ${max}px) 100vw, ${max}px`;
  const cleaned = breakpoints
    .concat(max) 
    .filter(w => w <= max)
    .sort((a, b) => a - b);
  const deduped = [...new Set(cleaned)];
  
  if (crop) {
    transformations.push("c_" + crop);
  }
  if (gravity) {
    transformations.push("g_" + gravity);
  }


  var baseTransformations = []
  if (source.derived && source.derived.length > 0) {
    baseTransformations.push(source.derived[0].raw_transformation)
  }

  const src = getImageURL({
    public_id: source.public_id, 
    cloudName: cloudName, 
    baseTransformations: baseTransformations,
    transformations: [`w_${max}`, ...transformations],
    format: source.format
  })

  const srcSet = deduped.map(breakpointWidth => {                
    const url = getImageURL({                  
      public_id: source.public_id, 
      cloudName: cloudName, 
      baseTransformations: baseTransformations,
      transformations: [`w_${breakpointWidth}`, ...transformations],
      format: source.format
    });

    return `${url} ${breakpointWidth}w`;
  })
  .join();

  return {
    aspectRatio: aspectRatio ? aspectRatio : source.width/source.height,
    base64: "",
    sizes: sizes,
    src: src,
    srcSet: srcSet
  }
}

exports.getFluidImage = getFluidImage