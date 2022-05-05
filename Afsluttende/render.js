const fs = require("fs");

const nav = fs.readFileSync("./public/global/nav/nav.html", "utf8");

function createPage(path, options) {
    return (nav + fs.readFileSync(`./public/pages/${path}`, "utf8"))
            .replace("%%DOCUMENT_TITLE%%", options?.title || "Nodefolio");
}


module.exports = {
    createPage
};