<?php
// Include router class
include '../requires/Route.php';
// Define a global basepath
define('BASEPATH','/');

/*define("PAGES", array(
    "index" => ["default.php", "default.js", "Home", "home"],
    "404" => ["404error.php", "404error.js", "404 Error"],
    "405" => ["405error.php", "405error.js", "405 Error"],
    "pg1" => ["page1.php", "page1.js", "Page 1"],
    "pg2" => ["page2.php", "page2.js", "Page 2"],
    "pg3" => ["page3.php", "page3.js", "Page 3"],
));*/
$json_obj = file_get_contents("pages.txt");
define("PAGES", json_decode($json_obj, true));

// If your script lives in a subfolder you can use the following example
// Do not forget to edit the basepath in .htaccess if you are on apache
// define('BASEPATH','/api/v1');

// Lets define some slugs for automatic route and navigation generation
// See examples below
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- link dynamic content loader -->
    <script src="/assets/dynamicContent.js"></script>
    <script src="/assets/index.js"></script>
    <link rel="stylesheet" href="/assets/style.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page</title>
</head>
<body>
    <p>Navbar:</p>
    <button id="page1" onclick="buttonPressed('pg1');">Page 1</button>
    <button id="page2" onclick="buttonPressed('pg2');">Page 2</button>
    <button id="page3" onclick="buttonPressed('pg3');">Page 3</button>
    <button id="home" onclick="buttonPressed('index');">Home</button>
    <button onclick="getInfo();">Get Page Data</button>
    <h1>Static Content</h1>
    <!-- dynamic content-->
    <div class="dynamic-content" id="dynamic-content"></div>
    <p>Static Content</p>
</body>
</html>
<?php
  
Route::generate();
Route::run(BASEPATH);
?>