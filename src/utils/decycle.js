const typeFieldWhitelist = {
"productType": ["name", "slug", "productTypeId"],
"catalogCategory": ["name", "slug"],
"blog":  ["title", "slug", "hero"],
"blogCategory": ["name", "slug"],
"author": ["name", "slug"]
}

const FIELDS = "fields";
const CONTENT = "content";
const EMBEDDED_ENTRY_BLOCK = "embedded-entry-block";
const EMBEDDED_ENTRY_INLINE = "embedded-entry-inline";

function filterFieldsOrKeep(v) {
if (v.sys && v.sys.contentType.sys.id in typeFieldWhitelist) {
    const wl = typeFieldWhitelist[v.sys.contentType.sys.id]
    const fields = Object.keys(v.fields)
        .filter(f => wl.includes(f))
        .reduce((fields, key) => { fields[key] = v.fields[key]; return fields}, {})
    return {
        sys: v.sys, 
        fields: fields
    };    
}
return v;
}

function decycleValue(value) {      
    if (value instanceof Object) {
        if (Array.isArray(value)) {
            value.forEach((entry) => {
                decycleValue(entry)
            })
        } else {        
            if (value.sys) {                        
                if (FIELDS in value) {
                Object.keys(value.fields).forEach((field) => {                                
                    const v = value.fields[field]
                    Object.keys(v).forEach((locale) => {
                    if (locale in v) {                  
                        if (v[locale] instanceof Object) {
                        if (Array.isArray(v[locale])) {
                            const x = v[locale];
                            for (var i = 0; i < x.length; i++) {                        
                            x[i] = filterFieldsOrKeep(x[i]);
                            }
                        } else {    
                            v[locale] = filterFieldsOrKeep(v[locale]);                                      
                        }                    
                        }
                        decycleValue(v[locale])
                    }
                    })                                
                })
                }
            } else {
            if (CONTENT in value) {        
                value.content.forEach((entry) => {              
                if (entry.nodeType === EMBEDDED_ENTRY_BLOCK) {
                    entry.data.target = filterFieldsOrKeep(entry.data.target)
                    decycleValue(entry.data.target)                                                
                } else {
                    entry.content.forEach((subentry) => {
                    if (subentry.nodeType === EMBEDDED_ENTRY_INLINE) {
                        decycleValue(subentry.data.target)                                                
                    }
                    })                
                }              
                })
            }           
            }        
        }        
    }        
}

function decycle(value) {      
    decycleValue(value);
    return value;   
}

exports.decycle = decycle