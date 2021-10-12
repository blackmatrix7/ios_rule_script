# 嘀嗒出行

嘀嗒出行自动签到和自动拾取贝壳脚本。每日0点10分执行脚本，自动进行当日签到，并显示签到获取的贝壳数量。同时拾取所有贝壳广场中的所有贝壳。

2020.09.03:

贝壳已自动拾取，去除通过脚本拾取贝壳的内容。

2020.08.07：

目前贝壳似乎是自动拾取的，不需要再通过脚本定时获取，所以每天都会提示“没有发现待拾取的贝壳”，目前不影响使用，暂时不做调整，观察一段时间再说。

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/didachuxing/didachuxing_plus.sgmodule

### Loon

使用远程脚本

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/didachuxing/didachuxing_plus.lnscript, tag=嘀嗒出行_每日签到, enabled=true
```

### Quantumult X

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/didachuxing/didachuxing_plus.qxrewrite, tag=嘀嗒出行_获取cookie, enabled=true

[task_local]
10 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/didachuxing/didachuxing_plus.js, tag=嘀嗒出行_每日签到, enabled=true
```

## 使用说明

打开嘀嗒出行App后，进入左侧菜单中的“贝壳广场”，正常情况下会自动获取Cookie。如果没有获取成功，请查阅Surge等第三方App的执行日志。

执行效果图，脚本更新时可能会进行微调。

![](https://github.com/blackmatrix7/ios_rule_script/raw/master/script/didachuxing/images/didachuxing_checkin01.jpg)

## 统一推送

MagicJS利用Bark，实现了跨设备的统一推送能力，将多个iOS设备的脚本执行结果，统一推送到一个设备上。

执行效果图，以饿了么为例：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/eleme/images/bark.jpg)

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