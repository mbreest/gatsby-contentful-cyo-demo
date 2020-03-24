function pageBreadcrumb(page) {    
    const links = [];        
    links.unshift({url: "/" + page.slug + "/", title: page.name});
    links.unshift({url: "", title: "Gestalten"});
    return links;
}        
exports.pageBreadcrumb = pageBreadcrumb;

function categoryBreadcrumb(page, current, categoryLookup) {        
    const links = [];        
    
    if (page && page.slug !== "-") {
      links.unshift({url: "/" + page.slug + "/", title: page.name});
      
      const history = [];      
      while (current && current in categoryLookup && !history.includes(current)) {
        history.push(current);        
        const category = categoryLookup[current];
        if (current !== "-") {
            links.unshift({url: "/" + category.slug + "/", title: category.name});
        }        
        if (category.parent) {            
            current = category.parent;
        } else {
            current = null;
        }        
      }

      links.unshift({url: "", title: "Gestalten"});
    }     
    
    return links;
} 
exports.categoryBreadcrumb = categoryBreadcrumb;

function blogBreadcrumb(page) {
    const links = [];
    if (page) {
      links.unshift({url: page.slug + "/", title: page.name});
    }    
    links.unshift({url: "blog", title: "News"})
    links.unshift({url: "", title: "Gestalten"});
    return links;
}

exports.blogBreadcrumb = blogBreadcrumb;