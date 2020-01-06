import React from "react"
import { Link } from "gatsby"
import actionButtonStyles from "./actionbutton.module.css"

function ActionButton({ title, link }) {                           
    return (        
        <Link to={link} className={actionButtonStyles.actionButton}>{title}</Link>            
    )
}

export default ActionButton