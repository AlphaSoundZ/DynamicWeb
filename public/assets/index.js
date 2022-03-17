/*const el = document.getElementById("page1");
console.log(el);
el.addEventListener("click", function(){
    console.log("test");
}, false);*/

dynamicContent = new dynamicContent();
window.onload = function() {
    dynamicContent.loadContent("page1.html", "page1.js");
};

function buttonPressed(button) {
    const js = button + ".js";
    const page = button + ".html";
    dynamicContent.loadContent(page, js);
}
