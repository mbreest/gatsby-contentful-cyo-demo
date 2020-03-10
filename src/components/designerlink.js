export const designerlink = (path, action, language) => {    
    let queryParams = []
    
    if (action) {
        if (action.product && action.product.contentfulid) {
            queryParams.push( "productType=" + action.product.contentfulid);    
        }
        if (action.designSearch) {
            if (language) {
                queryParams.push( "designSearch=" + action.designSearch[language]);       
            } else {
                queryParams.push( "designSearch=" + action.designSearch);       
            }                
        }
        if (action.viewId) {
            if (language) {
                queryParams.push( "view=" + action.viewId[language]);       
            } else {
                queryParams.push( "view=" + action.viewId);       
            }            
        }
        if (action.productTypeId) {
            if (language) {
                queryParams.push("productType=" + action.productTypeId[language]);       
            } else {
                queryParams.push("productType=" + action.productTypeId);       
            }            
        }
        if (action.productId) {
            if (language) {
                queryParams.push("product=" + action.productId[language]);       
            } else {
                queryParams.push("product=" + action.productId);       
            }            
        }
        if (action.appearanceId) {
            if (language) {
                queryParams.push( "appearance=" + action.appearanceId[language]);       
            } else {
                queryParams.push( "appearance=" + action.appearanceId);       
            }            
        }        
    }
    let queryString = queryParams.join("&");
    
    let url = "/" + path + "/";
    if (queryString) {
        url += "?" + queryString;
    }
    return url
}