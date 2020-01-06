import React from 'react'
import Helmet from "react-helmet";
import queryString from 'query-string';

class Designer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myExternalLib: null
        };

        this.handleScriptInject = this.handleScriptInject.bind(this);
    }

    handleScriptInject({ scriptTags }) {
        if (scriptTags) {
            const scriptTag = scriptTags[0];
            scriptTag.onload = () => {            
                console.log(`myExternalLib loaded!`, window.myExternalLib);
                this.setState({
                    myExternalLib: window.myExternalLib
                });
                let params = queryString.parse(window.location.search);
                console.log(params);
                window.spreadshirt.create("sketchomat", { productTypeId: params["productType"], target: document.getElementById("app"), locale: "de_DE"});
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