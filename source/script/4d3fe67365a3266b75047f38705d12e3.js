var body = $response.body;
var url = $request.url;

const path1 = '/api/subscriptions/2.1/user-subscriptions/';

let obj = JSON.parse(body);

if (url.indexOf(path1) != -1) {
	obj.user_subscription["expires_on_sec"] = 1655536094;
	obj.user_subscription["expired"] = false;
	obj.user_subscription["payment_type"] = 2;
	obj.user_subscription["is_trial_period"] = true;
	obj.user_subscription["starts_on_sec"] = 1560831070;
	obj.user_subscription["is_active"] = true;
	obj.user_subscription["auto_renew"] = true;
	obj.user_subscription["last_verified_sec"] = 1560831070;
	obj.user_subscription["subscription_code"] = "VSCOANNUAL";
	obj.user_subscription["user_id"] = 54624336;
	obj.user_subscription["source"] = 1;
	body = JSON.stringify(obj);  
 }

$done({body});
