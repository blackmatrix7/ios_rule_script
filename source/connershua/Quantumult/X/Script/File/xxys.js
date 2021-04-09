/*
XiaoXiaoYingShi unlock Vip
QX:
https:\/\/ios\.xiaoxiaoapps\.com\/(vod\/reqplay\/|ucp/index) url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/xxys.js
Surge:
http-response https:\/\/ios\.xiaoxiaoapps\.com\/(vod\/reqplay\/|ucp/index) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/xxys.js

MITM = ios.xiaoxiaoapps.com
*/

const path1 = "/ucp/index";
const path2 = "/vod/reqplay/";
var body = $response.body;
var url = $request.url;
if (url.indexOf(path1) != -1){
	let obj = JSON.parse(body);
	obj.data.uinfo["down_daily_remainders"] = "666";
	obj.data.uinfo["play_daily_remainders"] = "666";
	obj.data.user["goldcoin"] = "999";
	obj.data.uinfo["next_upgrade_need"] = "0";
	obj.data.uinfo["curr_group"] = "5";
	obj.data.user["isvip"] = "1";
	obj.data.user["goldcoin"] = "666";
	obj.data.user["gicon"] = "V5";
	obj.data.user["gid"] = "5";
	body = JSON.stringify(obj);
}
if (url.indexOf(path2) != -1){
	let obj = JSON.parse(body); 
	obj.retcode = "0";
	obj.data.lastplayindex = "1";
	if(obj.data.hasOwnProperty("httpurl_preview")){
		var playurl = obj.data["httpurl_preview"];
		obj.data["httpurl"] = playurl;
	};
	body = JSON.stringify(obj);
}

$done({body});

//by meeta