import requests
import unicodedata
import re
import os
import time

import dotenv
import contentful_management

def load_product_types():
    product_types = []

    response = requests.get("https://designer.spreadshirt.de/api/v1/shops/1133169/productTypes?mediaType=json&fullData=true&locale=de_DE&limit=1000")
    data = response.json()    
    for product_type in data["productTypes"]:           
        id = product_type["id"]
        name = product_type["name"]                
        slug = name.replace("ä", "ae").replace("ü", "ue").replace("ö", "oe").replace("ß", "ss")    
        slug = unicodedata.normalize('NFKD', slug).encode('ascii', 'ignore').decode('ascii')
        slug = re.sub('[^\w\s-]', '', slug).strip().lower()
        slug = re.sub('[-\s]+', '-', slug)        
        desc = product_type["description"].replace('<ul class="listMCE">', "").replace('<ul>', "").replace('</ul>', "\n").replace('<li>\r\n', "\n* ").replace('</li>\r\n', "").replace('\r\n</li>', "").replace('<li>', "\n* ").replace('</li>', "").replace("<br/>", "\n").replace("<br />", "\n").replace("<strong>", "**").replace("</strong>", "**").replace("\t", "").replace("\n\n", "\n").replace("\r\n", "\n")

        product_types.append({"id": id, "name": name, "slug": slug, "description": desc})
    
    return product_types

dotenv.load_dotenv()

SPACE_ID = os.getenv("SPACE_ID")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN_MGMT")
ENVIRONMENT = "master"

client = contentful_management.Client(ACCESS_TOKEN)

content_type = client.content_types(SPACE_ID, ENVIRONMENT).find("productType")
entries = content_type.entries().all({'limit':'1000'})  
existing_product_types = []

for entry in entries:    
    existing_product_types.append(str(entry.fields("de")["id"]))

print(f"{len(existing_product_types)} product types found: {','.join(existing_product_types)}")

product_types = load_product_types()
for product_type in product_types:
    if product_type["id"] not in existing_product_types:
        id = product_type["id"]
        print(f"Adding {id} ...")
        entry_attributes = {
            "content_type_id": "productType",            
            "fields": {         
                "id": {
                    "de": int(product_type["id"])
                },      
                "active": {
                    "de": True
                }, 
                "name": {
                    "de": product_type["name"]
                },
                "slug": {
                    "de": product_type["slug"]
                }, 
                "description": {
                    "de": product_type["description"]
                }
            }
        }        
        entry = client.entries(SPACE_ID, ENVIRONMENT).create(None, entry_attributes)
        entry.publish()     