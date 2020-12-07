# 百度贴吧签到

## 前言

参考 https://github.com/NobyDa/Script/tree/master/BDTieBa-DailyBonus 做了彻底的重写。

做如下改动：

1. 精简合并通知

   只显示签到贴吧总数、成功数量、失败数量，签到明细只会显示失败的，因为我并不关心哪些贴吧签到成功。

2. 增加重试机制

   针对签到失败的贴吧，进行10次，每次间隔2秒的重试，可以极大提高签到成功率。


## 配置

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/tieba/tieba_checkin.sgmodule
```

### Quantumult X

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/tieba/tieba_checkin.qxrewrite, tag=贴吧_获取Cookie, update-interval=86400, opt-parser=false, enabled=true

[task_local]
30 0 * * *  https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/tieba/tieba_checkin.js, tag=贴吧_每日签到, enabled=true
```

### Loon

配置文件

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/tieba/tieba_checkin.lnscript, tag=贴吧_每日签到, enabled=true
```

## 获取Cookie

关闭贴吧后台，重新进入一次贴吧即可。

![](https://github.com/blackmatrix7/ios_rule_script/blob/master/script/tieba/images/03.jpg?raw=true)

## 签到

带有重试机制，解决need vcode失败问题，凌晨高峰期签到也可以保证成功率。

全部签到成功时：

![](https://github.com/blackmatrix7/ios_rule_script/blob/master/script/tieba/images/01.jpg?raw=true)

部分贴吧签到失败时：

![](https://github.com/blackmatrix7/ios_rule_script/blob/master/script/tieba/images/02.jpg?raw=true)

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