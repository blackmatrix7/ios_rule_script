/*
README：https://github.com/yichahucha/surge/tree/master
 */

const $tool = new Tool()
const path1 = "/amdc/mobileDispatch"
const path2 = "/gw/mtop.taobao.detail.getdetail"
const consoleLog = false
const url = $request.url

if (url.indexOf(path1) != -1) {
    if ($tool.isResponse) {
        const $base64 = new Base64()
        let body = $response.body
        let obj = JSON.parse($base64.decode(body))
        let dns = obj.dns
        if (dns && dns.length > 0) {
            let i = dns.length;
            while (i--) {
                const element = dns[i];
                let host = "trade-acs.m.taobao.com"
                if (element.host == host) {
                    element.ips = []
                    if (consoleLog) console.log(JSON.stringify(element))
                }
            }
        }
        body = $base64.encode(JSON.stringify(obj))
        $done({ body })
    } else {
        let headers = $request.headers
        let body = $request.body
        if (headers["User-Agent"].indexOf("%E6%89%8B%E6%9C%BA%E6%B7%98%E5%AE%9D") != -1) {
            let json = Qs2Json(body)
            let domain = json.domain.split(" ")
            let i = domain.length;
            while (i--) {
                const block = "trade-acs.m.taobao.com"
                const element = domain[i];
                if (element == block) {
                    domain.splice(i, 1);
                }
            }
            json.domain = domain.join(" ")
            body = Json2Qs(json)
        }
        $done({ body })
    }
}

if (url.indexOf(path2) != -1) {
    const body = $response.body
    let obj = JSON.parse(body)
    let item = obj.data.item
    let shareUrl = `https://item.taobao.com/item.htm?id=${item.itemId}`
    let msg
    request_history_price(shareUrl)
        .then(data => {
            msg = data
            if (msg.priceTrend.series.length == 0) throw new Error('Whoops!')
        })
        .catch(error => msg = "暂无价格信息")
        .finally(() => {
            if (obj.data.apiStack) {
                let apiStack = obj.data.apiStack[0]
                let value = JSON.parse(apiStack.value)
                let tradeConsumerProtection = null
                let consumerProtection = null
                let trade = null
                let vertical = null
                if (value.global) {
                    tradeConsumerProtection = value.global.data.tradeConsumerProtection
                    consumerProtection = value.global.data.consumerProtection
                    trade = value.global.data.trade
                    vertical = value.global.data.vertical
                } else {
                    tradeConsumerProtection = value.tradeConsumerProtection
                    consumerProtection = value.consumerProtection
                    trade = value.trade
                    vertical = value.vertical
                }
                if (trade && trade.useWap == "true") {
                    sendNotify(msg)
                } else {
                    if (vertical && vertical.hasOwnProperty("tmallhkDirectSale")) {
                        sendNotify(msg)
                    } else if (tradeConsumerProtection) {
                        tradeConsumerProtection = setTradeConsumerProtection(msg, tradeConsumerProtection)
                    } else {
                        consumerProtection = setConsumerProtection(msg, consumerProtection)
                    }
                    apiStack.value = JSON.stringify(value)
                }
            } else {
                sendNotify(msg)
            }
            $done({ body: JSON.stringify(obj) })
        })
}

function sendNotify(data) {
    if (typeof data == "string") {
        $tool.notify("", "", `${data}`)
    } else {
        const detail = priceSummary(data)[1]
        $tool.notify("", "", `🍵 ${detail}`)
    }
}

function setConsumerProtection(data, consumerProtection) {
    let basicService = consumerProtection.serviceProtection.basicService
    let items = consumerProtection.items
    if (typeof data == "string") {
        let item = customItem(data, [])
        basicService.services.unshift(item)
        items.unshift(item)
    } else {
        const summary = priceSummary(data.priceTrend)[1]
        const item = customItem("价格详情", [`${summary}`])
        basicService.services.unshift(item)
        items.unshift(item)
    }
    return consumerProtection
}

function setTradeConsumerProtection(data, tradeConsumerProtection) {
    let service = tradeConsumerProtection.tradeConsumerService.service
    if (typeof data == "string") {
        service.items.unshift(customItem(data, ""))
    } else {
        const tbitems = priceSummary(data.priceTrend)[0]
        let nonService = tradeConsumerProtection.tradeConsumerService.nonService
        service.items = service.items.concat(nonService.items)
        nonService.title = "价格详情"
        nonService.items = tbitems
    }
    return tradeConsumerProtection
}

function priceSummary(data) {
    data = data.series[0]
    let summary = `当前: ${parseFloat(data.current / 100.0)}${getSpace(4)}最低: ${parseFloat(data.min / 100.0)}${getSpace(4)}最高: ${parseFloat(data.max / 100.0)}`
    let tbitems = [customItem(summary)]
    const list = historySummary(data.data)
    list.forEach((item, index) => {
        summary += `\n${item.Name}${getSpace(4)}${item.Price}${getSpace(4)}${item.Date}${getSpace(4)}${item.Difference}`
        let summaryItem = `${item.Name}${getSpace(4)}${item.Price}${getSpace(4)}${item.Date}${getSpace(4)}${item.Difference}`
        tbitems.push(customItem(summaryItem))
    });
    return [tbitems, summary]
}

function historySummary(list) {
    let currentPrice, lowest30, lowest90, lowest180, lowest360, price11, price618;
    list = list.reverse().slice(0, 360);
    list.forEach((item, index) => {
        const date = getExactTime(item.x);
        let price = parseFloat(item.y / 100.0);
        if (index == 0) {
            currentPrice = price;
            price618 = {
                Name: "六一八价格",
                Price: "-",
                Date: "-",
                Difference: "-",
                price: "-",
            };
            price11 = {
                Name: "双十一价格",
                Price: "-",
                Date: "-",
                Difference: "-",
                price: "-",
            };
            lowest30 = {
                Name: "三十天最低",
                Price: `¥${String(price)}`,
                Date: date,
                Difference: difference(currentPrice, price),
                price,
            };
            lowest90 = {
                Name: "九十天最低",
                Price: `¥${String(price)}`,
                Date: date,
                Difference: difference(currentPrice, price),
                price,
            };
            lowest180 = {
                Name: "一百八最低",
                Price: `¥${String(price)}`,
                Date: date,
                Difference: difference(currentPrice, price),
                price,
            };
            lowest360 = {
                Name: "三百六最低",
                Price: `¥${String(price)}`,
                Date: date,
                Difference: difference(currentPrice, price),
                price,
            };
        }
        if (date.indexOf("06-18") != -1) {
            price618.price = price;
            price618.Price = `¥${String(price)}`;
            price618.Date = date;
            price618.Difference = difference(currentPrice, price);
        }
        if (date.indexOf("11-11") != -1) {
            price11.price = price;
            price11.Price = `¥${String(price)}`;
            price11.Date = date;
            price11.Difference = difference(currentPrice, price);
        }
        if (index < 30 && price < lowest30.price) {
            lowest30.price = price;
            lowest30.Price = `¥${String(price)}`;
            lowest30.Date = date;
            lowest30.Difference = difference(currentPrice, price);
        }
        if (index < 90 && price < lowest90.price) {
            lowest90.price = price;
            lowest90.Price = `¥${String(price)}`;
            lowest90.Date = date;
            lowest90.Difference = difference(currentPrice, price);
        }
        if (index < 180 && price < lowest180.price) {
            lowest180.price = price;
            lowest180.Price = `¥${String(price)}`;
            lowest180.Date = date;
            lowest180.Difference = difference(currentPrice, price);
        }
        if (index < 360 && price < lowest360.price) {
            lowest360.price = price;
            lowest360.Price = `¥${String(price)}`;
            lowest360.Date = date;
            lowest360.Difference = difference(currentPrice, price);
        }
    });
    return [lowest30, lowest90, lowest180, lowest360, price618, price11];
}

async function request_history_price(share_url) {
    const options = {
        headers: {
            "User-Agent":
                "bijiago/1.4.2 (com.bijiago.app; build:65; iOS 14.5.1) Alamofire/4.9.1",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const rid = new Promise(function (resolve, reject) {
        options.url = "https://app.bijiago.com/service/product?app_platform=ios&app_version=65&device=750%2A1334&opt=product&posi=default&url=" + encodeURIComponent(share_url);
        $tool.get(options, function (error, response, data) {
            if (!error) {
                resolve(JSON.parse(data))
            } else {
                reject(error)
            }
        })
    })

    const priceTrend = (rid, dq_id) => {
        return new Promise(function (resolve, reject) {
            options.url = "https://app.bijiago.com/service/product"
            options.body = `app_platform=ios&app_version=10000&append_promo=1&dp_id=${dq_id}&from=url&opt=priceTrend&rid=${rid}`
            $tool.post(options, function (error, response, data) {
                if (!error) {
                    resolve(JSON.parse(data));
                } else {
                    reject(error)
                }
            })
        })
    }
    const ridData = await (rid)
    const priceTrendData = await (priceTrend(ridData.rid, ridData.product.dp_id))
    return priceTrendData
}

function getExactTime(time) {
    var date = new Date(time * 1000);
    var year = date.getFullYear() + "-";
    var month =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var dates = date.getDate();
    return year + month + dates;
}

function difference(currentPrice, price) {
    let difference = sub(currentPrice, price)
    if (difference == 0) {
        return "-"
    } else {
        return `${difference > 0 ? "↑" : "↓"}${String(Math.abs(difference))}`
    }
}

function sub(arg1, arg2) {
    return add(arg1, -Number(arg2), arguments[2]);
}

function add(arg1, arg2) {
    arg1 = arg1.toString(), arg2 = arg2.toString();
    var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
}

function getSpace(length) {
    let blank = "";
    for (let index = 0; index < length; index++) {
        blank += " ";
    }
    return blank;
}

function customItem(title, desc) {
    return {
        icon: "https://s2.ax1x.com/2020/02/16/3STeIJ.png",
        title: title,
        name: title,
        desc: desc
    }
}

function Qs2Json(url) {
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

function Json2Qs(json) {
    var temp = [];
    for (var k in json) {
        temp.push(k + "=" + json[k]);
    }
    return temp.join("&");
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Date.prototype.format = function (fmt) {
    var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}

function Tool() {
    _node = (() => {
        if (typeof require == "function") {
            const request = require('request')
            return ({ request })
        } else {
            return (null)
        }
    })()
    _isSurge = typeof $httpClient != "undefined"
    _isQuanX = typeof $task != "undefined"
    this.isSurge = _isSurge
    this.isQuanX = _isQuanX
    this.isResponse = typeof $response != "undefined"
    this.notify = (title, subtitle, message) => {
        if (_isQuanX) $notify(title, subtitle, message)
        if (_isSurge) $notification.post(title, subtitle, message)
        if (_node) console.log(JSON.stringify({ title, subtitle, message }));
    }
    this.write = (value, key) => {
        if (_isQuanX) return $prefs.setValueForKey(value, key)
        if (_isSurge) return $persistentStore.write(value, key)
    }
    this.read = (key) => {
        if (_isQuanX) return $prefs.valueForKey(key)
        if (_isSurge) return $persistentStore.read(key)
    }
    this.get = (options, callback) => {
        if (_isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => { callback(null, _status(response), response.body) }, reason => callback(reason.error, null, null))
        }
        if (_isSurge) $httpClient.get(options, (error, response, body) => { callback(error, _status(response), body) })
        if (_node) _node.request(options, (error, response, body) => { callback(error, _status(response), body) })
    }
    this.post = (options, callback) => {
        if (_isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => { callback(null, _status(response), response.body) }, reason => callback(reason.error, null, null))
        }
        if (_isSurge) $httpClient.post(options, (error, response, body) => { callback(error, _status(response), body) })
        if (_node) _node.request.post(options, (error, response, body) => { callback(error, _status(response), body) })
    }
    _status = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else if (response.statusCode) {
                response["status"] = response.statusCode
            }
        }
        return response
    }
}

function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
