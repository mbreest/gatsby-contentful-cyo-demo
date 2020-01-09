import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.css"

function Breadcrumb({ links }) {                           
    return (   
        <ul className={breadcrumbStyles.breadcrumb}>            
        {links.length > 1 && links.map( (link) => {     
            return (
            <li key={link.url}>
                <Link to={link.url}>{link.title}</Link>
            </li>
            )
        })}
        </ul>
    )
}

export default Breadcrumb