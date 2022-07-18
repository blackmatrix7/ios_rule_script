let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});