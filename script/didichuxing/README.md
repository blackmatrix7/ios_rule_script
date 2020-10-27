# 滴滴出行

滴滴出行每日自动签到与抽奖，基于 https://github.com/zZPiglet/Task/tree/master/DiDi 进行重写。

做如下改动：

1. 合并JS脚本，减少外部资源引用数量。
2. 多条获取token/ticket的方式，解决偶尔获取不到token/ticket的问题。
3. 增加抽奖功能，抽奖虽然每次消耗30福利金，但最低奖励是35福利金，不亏。

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didichuxing/didi_checkin.js

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didichuxing/didi_checkin.lnscript, tag=滴滴出行_每日签到, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didichuxing/didi_checkin.qxrewrite, tag=滴滴出行_获取Cookie, enabled=true

[task_local]
05 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didichuxing/didi_checkin.js, tag=滴滴出行_每日签到, enabled=true
```

## 获取Cookie

重新进入一次滴滴出行APP，即可获取Cookie。

## 获取lid

抽奖需要获取lid，获取路径为滴滴左上角-钱包-我的钱包-福利金-福利金抽奖。

**不获取lid，不会启用抽奖功能，不影响使用。**

## 获取ActivityId

天天有奖，首次使用需要手动签到一次获取ActivityId和ChannelId，不获取会尝试使用内置的ActivityId和ChannelId。

获取路径：滴滴出行 - 左侧菜单 - 钱包 - 天天有奖，手动签到一次。

**不获取ActivityId和ChannelId，不会启用天天有奖签到，不影响使用。**

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