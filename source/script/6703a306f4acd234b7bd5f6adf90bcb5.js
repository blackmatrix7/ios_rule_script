/*
README：https://github.com/yichahucha/surge/tree/master
 */

const path1 = "serverConfig";
const path2 = "wareBusiness";
const path3 = "basicConfig";
const url = $request.url;
const body = $response.body;
const $tool = tool();

if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);
    delete obj.serverConfig.httpdns;
    delete obj.serverConfig.dnsvip;
    delete obj.serverConfig.dnsvip_v6;
    $done({ body: JSON.stringify(obj) });
}

if (url.indexOf(path3) != -1) {
    let obj = JSON.parse(body);
    let JDHttpToolKit = obj.data.JDHttpToolKit;
    if (JDHttpToolKit) {
        delete obj.data.JDHttpToolKit.httpdns;
        delete obj.data.JDHttpToolKit.dnsvipV6;
    }
    $done({ body: JSON.stringify(obj) });
}

if (url.indexOf(path2) != -1) {
    let obj = JSON.parse(body);
    const floors = obj.floors;
    const commodity_info = floors[floors.length - 1];
    const shareUrl = commodity_info.data.property.shareUrl;
    let msg = "";
    request_history_price(shareUrl)
        .then((data) => {
            if (data.errno == -1) throw new Error("Whoops!");
            msg = priceSummary(data.data);
        })
        .catch((error) => (msg = "暂无价格信息"))
        .finally(() => {
            const lowerword = adword_obj();
            lowerword.data.ad.textColor = "#fe0000";
            let bestIndex = 0;
            for (let index = 0; index < floors.length; index++) {
                const element = floors[index];
                if (element.mId == lowerword.mId) {
                    bestIndex = index + 1;
                    break;
                } else {
                    if (element.sortId > lowerword.sortId) {
                        bestIndex = index;
                        break;
                    }
                }
            }
            lowerword.data.ad.adword = msg;
            floors.insert(bestIndex, lowerword);
            $done({ body: JSON.stringify(obj) });
        });
}

function priceSummary(data) {
    let summary = `🌨 当前: ${data.CurrentPrice}${getSpace(8)}最低: ${data.LowestPrice} (${data.LowestDate})`;
    const list = historySummary(data.PricesHistory);
    list.forEach((item, index) => {
        summary += `\n${item.Name}${getSpace(8)}${item.Price}${getSpace(8)}${item.Date}${getSpace(8)}${item.Difference}`;
    });
    return summary;
}

function historySummary(list) {
    let currentPrice, lowest30, lowest90, lowest180, lowest360, price11, price618;
    list = list.reverse().slice(0, 360);
    list.forEach((item, index) => {
        const date = item.Date;
        let price = item.Price;
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
            "Content-Type": "application/json; charset=utf-8",
        },
    };

    const priceTrend = new Promise(function (resolve, reject) {
        options.url = "https://price.icharle.com/?product_id=" + share_url;
        $tool.get(options, function (error, response, data) {
            if (!error) {
                resolve(JSON.parse(data));
            } else {
                reject(error);
            }
        });
    });
    const priceTrendData = await priceTrend;
    return priceTrendData;
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
    let difference = sub(currentPrice, price);
    if (difference == 0) {
        return "-";
    } else {
        return `${difference > 0 ? "↑" : "↓"}${String(Math.abs(difference))}`;
    }
}

function sub(arg1, arg2) {
    return add(arg1, -Number(arg2), arguments[2]);
}

function add(arg1, arg2) {
    (arg1 = arg1.toString()), (arg2 = arg2.toString());
    var arg1Arr = arg1.split("."),
        arg2Arr = arg2.split("."),
        d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number(result.toFixed(d)) : result;
}

function getSpace(length) {
    let blank = "";
    for (let index = 0; index < length; index++) {
        blank += " ";
    }
    return blank;
}

function adword_obj() {
    return {
        bId: "eCustom_flo_199",
        cf: {
            bgc: "#ffffff",
            spl: "empty",
        },
        data: {
            ad: {
                adword: "",
                textColor: "#8C8C8C",
                color: "#f23030",
                newALContent: true,
                hasFold: true,
                class: "com.jd.app.server.warecoresoa.domain.AdWordInfo.AdWordInfo",
                adLinkContent: "",
                adLink: "",
            },
        },
        mId: "bpAdword",
        refId: "eAdword_0000000028",
        sortId: 13,
    };
}

function tool() {
    const isSurge = typeof $httpClient != "undefined";
    const isQuanX = typeof $task != "undefined";
    const isResponse = typeof $response != "undefined";
    const node = (() => {
        if (typeof require == "function") {
            const request = require("request");
            return { request };
        } else {
            return null;
        }
    })();
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message);
        if (isSurge) $notification.post(title, subtitle, message);
        if (node) console.log(JSON.stringify({ title, subtitle, message }));
    };
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key);
        if (isSurge) return $persistentStore.write(value, key);
    };
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key);
        if (isSurge) return $persistentStore.read(key);
    };
    const adapterStatus = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status;
            } else if (response.statusCode) {
                response["status"] = response.statusCode;
            }
        }
        return response;
    };
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options };
            options["method"] = "GET";
            $task.fetch(options).then(
                (response) => {
                    callback(null, adapterStatus(response), response.body);
                },
                (reason) => callback(reason.error, null, null)
            );
        }
        if (isSurge)
            $httpClient.get(options, (error, response, body) => {
                callback(error, adapterStatus(response), body);
            });
        if (node) {
            node.request(options, (error, response, body) => {
                callback(error, adapterStatus(response), body);
            });
        }
    };
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options };
            options["method"] = "POST";
            $task.fetch(options).then(
                (response) => {
                    callback(null, adapterStatus(response), response.body);
                },
                (reason) => callback(reason.error, null, null)
            );
        }
        if (isSurge) {
            $httpClient.post(options, (error, response, body) => {
                callback(error, adapterStatus(response), body);
            });
        }
        if (node) {
            node.request.post(options, (error, response, body) => {
                callback(error, adapterStatus(response), body);
            });
        }
    };
    return { isQuanX, isSurge, isResponse, notify, write, read, get, post };
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
        "S+": this.getMilliseconds(),
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            } else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(
                    RegExp.$1,
                    ("00" + o[k]).substr(("" + o[k]).length - 1, lens)
                );
            } else {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
    }
    return fmt;
};
