import React from 'react'
import Helmet from "react-helmet";
import queryString from 'query-string';

class Designer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myExternalLib: null,            
        };


        this.handleScriptInject = this.handleScriptInject.bind(this);
    }

    handleScriptInject({ scriptTags, designerType }) {
        if (scriptTags) {
            const scriptTag = scriptTags[0];
            scriptTag.onload = () => {            
                this.setState({
                    myExternalLib: window.myExternalLib,                    
                });
                let params = queryString.parse(window.location.search);
                let designerParams = {target: document.getElementById("app"), locale: "de_DE"}
                if ("productType" in params) {
                    designerParams["productTypeId"] = params["productType"];
                }
                if ("product" in params) {
                    designerParams["productId"] = params["product"];
                }
                if ("view" in params) {
                    designerParams["viewId"] = params["view"];
                }
                if ("appearance" in params) {
                    designerParams["appearanceId"] = params["appearance"];
                }
                if ("designSearch" in params) {
                    designerParams["designSearch"] = params["designSearch"];
                }                                
                var designerType = "sketchomat";
                if (window.innerWidth <= 600) {                    
                    designerType = "smartomat";                                        
                    designerParams["height"] = window.innerHeight - document.getElementById("header").offsetHeight;
                } else if (window.innerWidth <= 1024 && window.innerHeight <= 1024) {
                    designerType = "sketchomat";                                        
                    designerParams["height"] = window.innerHeight - document.getElementById("header").offsetHeight;
                    designerParams["width"] = window.innerWidth;
                }
                window.spreadshirt.create(designerType, designerParams);
            };
        }
    }

    render() {
        return (<div>
            <Helmet
                script={[{ src: "//assets.spreadshirt.net/cyo/designer.min.js" }]}
                onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
            />            
            <div id="app"></div>
        </div>);
    }
}

export default Designer