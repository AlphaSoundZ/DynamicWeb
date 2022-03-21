const XdynamicContent = new dynamicContent();

function buttonPressed(path) {
    const PAGES = JSON.parse(loadFile("../pages.txt"));
    var UrlPath = path;
    if (PAGES[path][3])
        UrlPath = PAGES[path][3];
    XdynamicContent.loadContent(PAGES[path][0], PAGES[path][1], PAGES[path][2], UrlPath); // 1. param: page-file-name, 2. param: json-file-name, 3. param: document Title, 4. param: url path
}

function getInfo() {
    console.log(XdynamicContent.info[0], XdynamicContent.info[1], XdynamicContent.info[2], XdynamicContent.info[3]);
}   