import React from "react"
import contentElementStyles from "./menu.module.css"
import { Link } from "gatsby"

function Menu({type, menuItems}) {   
  var className = contentElementStyles.menu;
  if (type === "sub") {
    className = contentElementStyles.submenu;
  }
  return ( 
        <div className={className}>
            <ul>                            
                {(menuItems).map( (menuItem) => {
                  return(
                    <li key={menuItem.path}>
                      <Link to={menuItem.path}>{menuItem.name}</Link>
                    </li>  
                  ) 
                })}               
            </ul>
        </div>             
  )
}
export default Menu

