# 小米有品

小米有品每日自动签到

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/youpin/youpin_checkin.sgmodule

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/youpin/youpin_checkin.lnscript, tag=小米有品_每日签到, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/youpin/youpin_checkin.qxrewrite, tag=小米有品_获取Cookie, enabled=true

[task_local]
20 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/obsolete/youpin/youpin_checkin.js, tag=小米有品_每日签到, enabled=true
```

## 获取Cookie

小米有品APP - 我的 - 天天福利 - 每天签到领红包