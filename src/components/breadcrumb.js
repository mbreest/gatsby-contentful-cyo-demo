import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.css"

function Breadcrumb({ links, mod }) {                           
    return (   
        <div className={breadcrumbStyles.breadcrumb + " " + mod }>
            <ul >            
            {links.length > 1 && links.map( (link) => {     
                var l = link.url === "" ? "/" : link.url.startsWith("/") ? link.url : "/" + link.url + "/";
                return (
                    <li key={link.url}>
                        <Link to={l}>{link.title}</Link>
                    </li>
                )
            })}
            </ul>
        </div>
        
    )
}

export default Breadcrumb