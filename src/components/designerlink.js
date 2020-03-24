export const designerlink = (path, action, locale) => {        
    let queryParams = []

    if (action && action.fields) {
        if (action.fields.product && action.fields.product[locale].fields.productTypeId[locale]) {
            queryParams.push( "productType=" + action.fields.product[locale].fields.productTypeId[locale]);    
        }
        if (action.fields.designSearch) {            
            queryParams.push( "designSearch=" + action.fields.designSearch[locale]);       
        }
        if (action.fields.viewId) {
            queryParams.push( "view=" + action.fields.viewId[locale]);       
        }
        if (action.fields.productTypeId) {            
            queryParams.push("productType=" + action.fields.productTypeId[locale]);       
        }
        if (action.fields.productId) {
            queryParams.push("product=" + action.fields.productId[locale]);       
        }
        if (action.fields.appearanceId) {            
            queryParams.push( "appearance=" + action.fields.appearanceId[locale]);       
        }        
    } else {        
        if (action.designSearch) {            
            queryParams.push( "designSearch=" + action.designSearch);       
        }
        if (action.viewId) {
            queryParams.push( "view=" + action.viewId);       
        }
        if (action.productTypeId) {            
            queryParams.push("productType=" + action.productTypeId);       
        }
        if (action.productId) {
            queryParams.push("product=" + action.productId);       
        }
        if (action.appearanceId) {            
            queryParams.push( "appearance=" + action.appearanceId);       
        }    
    }    
    let queryString = queryParams.join("&");
    
    let url = "/" + path + "/";
    if (queryString) {
        url += "?" + queryString;
    }
    return url
}