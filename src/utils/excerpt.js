const prune = require("underscore.string/prune");

const VALUE = "value";

function excerptRichtext(content, maxLength, ending) {
    const text = content.content.map((node) => {
        return node.content.map((subnode) => {
            if (VALUE in subnode) {
                return subnode.value;
            } else {
                return "";
            }
        }).join(" ");
    }).join(" ");          

    return prune(text, maxLength, ending);
}

exports.excerptRichtext = excerptRichtext
         