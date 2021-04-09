# 联通每日签到与抽奖

每日自动签到，显示已用流量、语音、剩余话费、可用积分，每日抽奖4次。

活动期间，**每日必得一张30-3的美团外卖优惠券**，送到和当前签到同手机号的美团账号上，活动到什么时候结束我也不知道。

目前还是有的，实打实的优惠，别错过。

## 配置说明

### Surge

使用模块，地址

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_signin.sgmodule
```

### Quantumult X

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_signin.qxrewrite, tag=联通_获取cookie, update-interval=86400, opt-parser=false, enabled=true

[task_local]
20 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_signin.js, tag=联通_签到与抽奖, enabled=true
```

### Loon

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_signin.lnscript, tag=联通_签到与抽奖, enabled=true
```

## 获取Cookie

联通手机营业厅APP经常修改“天天抽奖”入口位置，比较稳定的方法是在联通手机营业厅中搜索“天天抽奖”，直接通过搜索结果进入。

## 签到效果图

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/images/01.jpg)

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/images/02.jpg)

## 统一推送

MagicJS利用Bark，实现了跨设备的统一推送能力，将多个iOS设备的脚本执行结果，统一推送到一个设备上。

执行效果图，以饿了么为例：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark.jpg)

### 开启统一推送

你需要安装Bark这个APP，打开后可以得到类似这样的链接：

```http
https://api.day.app/VXTWvaQ18N29bsQAg7DgkT
```

在Surge、Loon、QuantumultX中执行以下代码，将链接写入(如何执行代码请自己动手解决)。

**Surge、Loon**

```javascript
# 开启所有脚本统一推送
$persistentStore.write("https://api.day.app/VXTWvaQ18N29bsQAg7DgkT", "magicjs_unified_push_url");
```

**Quantumult X**

```javascript
# 开启所有脚本统一推送
$prefs.setValueForKey("https://api.day.app/VXTWvaQ18N29bsQAg7DgkT", "magicjs_unified_push_url");
```

### 关闭统一推送

**Surge、Loon**

```javascript
# 关闭所有脚本统一推送
$persistentStore.write("", "magicjs_unified_push_url");
```

**Quantumult X**

```javascript
# 关闭所有脚本统一推送
$prefs.setValueForKey("", "magicjs_unified_push_url");
```

### 其他

1. 统一推送能力仅对支持的脚本有效。
2. 开启统一推送后，所有支持统一推送的脚本，都会把通知推送到目标设备上。
3. 限于Bark的功能，统一推送中的多媒体和链接不可用。
4. 统一推送需要使用Bark的服务器，推送成功与否，与Bark服务器的可用性有关。
5. 统一推送不会关闭APP的本地推送，即两个iOS设备都会有推送。
6. 如有隐私考虑，可以参考Bark的服务端文档，自建服务端。

