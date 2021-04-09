/*
大片 unlock vip

QX:
^https?:\/\/api\.vnision\.com\/v1\/(users\/|banners) url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/dapian.js

Surge4：
http-response ^https?:\/\/api\.vnision\.com\/v1\/(users\/|banners) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/dapian.js

Surge & QX MITM = api.vnision.com
*/

var body = $response.body;
var url = $request.url;

const vip = '/v1/users/';
const ad = '/v1/banners';

if (url.indexOf(vip) != -1) {
    let obj = JSON.parse(body);
    obj.user.is_member = 1;
	body = JSON.stringify(obj);  
 }

if (url.indexOf(ad) != -1) {
    let obj = JSON.parse(body);
	delete obj.banners
	body = JSON.stringify(obj); 
 }

$done({body});