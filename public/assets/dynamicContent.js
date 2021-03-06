class dynamicContent {
    loadContent(page, js, title, path, data = null) {
        if (!Array.isArray(js))
            js = [js];
        var xhttp = new XMLHttpRequest();
        var xpage = "../content/pages/" + page;
        xhttp.open("POST", xpage, true);
        var me = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                me.updateURL(path, title);
                me.info = [page, js.slice(), title, path];
                if (js) {
                    js.forEach(function(file) {
                        var xjs = "../content/pages/assets/js/" + js;
                        me.loadJS(xjs, false);
                    });
                }
                document.getElementById("dynamic-content").innerHTML = this.responseText;
            }
            if (this.status == 404) {
                me.fileNotFound();
            }
        };

        if (data) xhttp.send(JSON.stringify(data));
        else xhttp.send();
    }
    loadJS(FILE_URL, async = true) {
        var scriptEleExists = document.querySelector('script[src="'+FILE_URL+'"]'); // Does the script tag already exist?
        let scriptEle = document.createElement("script");
        
        scriptEle.setAttribute("src", FILE_URL);
        scriptEle.setAttribute("type", "text/javascript");
        scriptEle.setAttribute("async", async);
        
        document.body.appendChild(scriptEle);
        
        // success event 
        scriptEle.addEventListener("load", () => {
            // File loaded
        });
            // error event
        scriptEle.addEventListener("error", (ev) => {
            // error on loading file
            this.fileNotFound();
        });
    }
    updateURL(urlPath, title) {
        window.history.replaceState({}, "", "/"+urlPath);

        document.title = title;
    }
    fileNotFound() {
        const PAGES = JSON.parse(loadFile("../pages.txt"));
        this.loadContent(PAGES["404"][0], PAGES["404"][1], PAGES["404"][2], "404");
    }
    loadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, true);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
        }
        return result;
    }
}