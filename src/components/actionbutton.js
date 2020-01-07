import React from "react"
import { Link } from "gatsby"
import actionButtonStyles from "./actionbutton.module.css"

function ActionButton({ title, link, full }) {                           
    let className = actionButtonStyles.actionButton;
    if (full === "yes") {
        className += " " + actionButtonStyles.full;
    }
    return (        
        <Link to={link} className={className}>{title}</Link>            
    )
}

export default ActionButton