import React from "react"
import contentElementStyles from "./menu.module.css"
import { Link } from "gatsby"

function Menu({type, menuItems, mod}) {   
  var className = contentElementStyles.menu;
  if (type === "sub") {
    className = contentElementStyles.submenu;
  }
  if (mod) {
    className += mod;
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

