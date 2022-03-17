
class dynamicContent {
    loadContent(page, js = null,  data = null) {  
        var xhttp = new XMLHttpRequest();
        var xpage = "../content/pages/" + page;
        if (js) var xjs = "../content/pages/assets/js/" + js;
        xhttp.open("POST", xpage, true);
        loadJS(xjs);      
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                dynamicContent.responseText = this.responseText;
                document.getElementById("dynamic-content").innerHTML = dynamicContent.responseText;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");

        if (data) xhttp.send(JSON.stringify(data));
        else xhttp.send();
    }
    getResponseData() {

    }
}

function loadJS(FILE_URL, async = true) {
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

function processAjaxData(response, urlPath) {
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
}