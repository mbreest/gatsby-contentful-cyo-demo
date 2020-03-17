export const designerlink = (path, action, language) => {    
    let queryParams = []
    
    if (action) {
        if (action.product && action.product.productTypeId) {
            queryParams.push( "productType=" + action.product.productTypeId);    
        }
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