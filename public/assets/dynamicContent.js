class dynamicContent {
    loadContent(page, js = Array(), title, path, data = null) {  
        var xhttp = new XMLHttpRequest();
        var xpage = "../content/pages/" + page;
        if (js) var xjs = "../content/pages/assets/js/" + js;
        xhttp.open("POST", xpage, true);
        var me = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("dynamic-content").innerHTML = this.responseText;
                me.updateURL(path, title);
                me.info = [page, js.slice(), title, path];
                if (js)
                    me.loadJS(xjs, false);
            }
            if (this.status == 404) {
                console.log("file not found");
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");

        if (data) xhttp.send(JSON.stringify(data));
        else xhttp.send();
    }
    loadJS(FILE_URL, async = true) {
        var scriptEleExists = document.querySelector('script[src="'+FILE_URL+'"]'); // Does the script tag already exist?
        if (!scriptEleExists)
        {
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
            });
        }
    }
    updateURL(urlPath, title) {
        window.history.replaceState({}, "", "/"+urlPath);

        document.title = title;
    }
}