/*
爱美剧 unlock vip
app download link : app.meiju2018.com

QX : 
^https?:\/\/mjapp\.\w{1,9}\.com\/index\.php\/app\/ios\/(vod\/show|user\/index) url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/aimeiju.js

Surge4：
http-response ^https?:\/\/mjapp\.\w{1,9}\.com\/index\.php\/app\/ios\/(vod\/show|user\/index) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/aimeiju.js
*/

var body = $response.body;
var url = $request.url;
const path1 = "/index.php/app/ios/user/index";
const path2 = "/index.php/app/ios/vod/show";

if (url.indexOf(path1) != -1){
  let obj = JSON.parse(body);
  obj.data.user["viptime"] = "2066-01-01 08:00:00";
  obj.data.user["cion"] = "66666";
  obj.data.user["vip"] = "1";
  body = JSON.stringify(obj);
}

if (url.indexOf(path2) != -1){
  let obj = JSON.parse(body);
  obj.data["looktime"] = -1;
  obj.data["vip"] = "4";
  body = JSON.stringify(obj);
}

$done({body});


// Made by Meeta