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