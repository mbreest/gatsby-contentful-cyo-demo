import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.css"

function Breadcrumb({ links }) {                           
    return (   
        <div className={breadcrumbStyles.breadcrumb}>
            <ul >            
            {links.length > 1 && links.map( (link) => {     
                return (
                    <li key={link.url}>
                        <Link to={link.url}>{link.title}</Link>
                    </li>
                )
            })}
            </ul>
        </div>
        
    )
}

export default Breadcrumb