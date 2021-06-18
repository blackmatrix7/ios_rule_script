# 万达电影—签到

参考 https://github.com/chavyleung/scripts/tree/master/wanda 做了彻底的重写。

做以下改动：

1. 解决配置成Surge模块，不注释获取Cookie的脚本时，打开万达电影APP反复弹出获取Cookie成功通知的问题。
2. 合并脚本文件，减少引用外部文件数量。
4. 增加ActivityCode自动获取，不用苦等更新每月的ActivityCode了。
5. 每月第一天提醒手动获取一次最新的ActivityCode。

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/wanda/wanda_checkin.sgmodule

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/wanda/wanda_checkin.lnscript, tag=万达电影_每日签到, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/wanda/wanda_checkin.qxrewrite, tag=万达电影_获取Cookie, enabled=true

[task_local]
20 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/wanda/wanda_checkin.js, tag=万达电影_每日签到, enabled=true
```

## 获取ActivityCode

首次使用或每月第一天都需要重新获取当月的ActivityCode

获取路径：万达电影APP-活动-每月签到

## 获取Cookie

获取路径：万达电影APP - 我的 

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