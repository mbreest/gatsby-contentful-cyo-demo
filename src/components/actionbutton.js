import React from "react"
import { Link, navigate } from "gatsby"
import actionButtonStyles from "./actionbutton.module.css"

function ActionButton({ title, link, full, hidden }) {                           
    let className = actionButtonStyles.actionButton;
    if (full === "yes") {
        className += " " + actionButtonStyles.full;
    }
    let buttonClassName = actionButtonStyles.actionButtonButton;
    if (full === "yes") {
        buttonClassName += " " + actionButtonStyles.full;
    }
    if (hidden) {
        return (
            <form onSubmit={event => {
              event.preventDefault()              
              navigate(link)
            }}
          >      
            <button className={buttonClassName}>{title}</button>      
          </form>           
        )        
    } else {
        return (        
            <Link to={link} className={className}>{title}</Link>            
        )
    }
    
}

export default ActionButton