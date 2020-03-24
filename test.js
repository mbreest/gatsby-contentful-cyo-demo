const contentful = require("contentful");
const decycle = require("./src/utils/decycle.js").decycle

const client = contentful.createClient({  
  space: "24aw2s4ysnfi",
  accessToken: "2JUSSzw9cAa97SDEEFxkzVM9vd03OUTO1kpdYLtIIOY"
});


client
.sync({initial: true})
.then((response) => {  
  for (var i = 0; i < response.entries.length; i++) {
    var item = response.entries[i];
    if (item.sys.contentType.sys.id === "blog") {      
      decycle(item);          
      console.log(JSON.stringify(item, 2, "  "))
    }    
  }  
})

