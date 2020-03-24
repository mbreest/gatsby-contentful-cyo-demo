import React from "react"
import contentElementStyles from "./logo.module.css"
import { Link } from "gatsby"

function Logo() {      
    return (   
        <div className={contentElementStyles.logo}>
            <Link to={`/`}>
                <img src="/images/logo.svg" alt="Spreadshirt Logo"/>
            </Link>   
        </div>        
  )
}
export default Logo

