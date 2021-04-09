/*
看漫画极速版 unlock vip, currently off the shelf

QX:
^https?:\/\/getuserinfo\.321mh\.com\/app_api\/v5\/getuserinfo\/ url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/kmh.js

Surge4：
http-response ^https?:\/\/getuserinfo\.321mh\.com\/app_api\/v5\/getuserinfo\/ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/kmh.js

Surge & QX MITM = getuserinfo.321mh.com
*/

var body = $response.body;
var url = $request.url;
const path = "/app_api/v5/getuserinfo/";
let obj = JSON.parse(body);
if (url.indexOf(path) != -1) {
	obj["isvip"] = "1";
	body = JSON.stringify(obj);
 }
$done({body});

// From HoGer
