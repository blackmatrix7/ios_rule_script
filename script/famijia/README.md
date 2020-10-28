# Fa米家

Fa米家每日自动签到

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/famijia/famijia_checkin.sgmodule

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/famijia/famijia_checkin.lnscript, tag=Fa米家_每日签到, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/famijia/famijia_checkin.qxrewrite, tag=Fa米家_获取Cookie, enabled=true

[task_local]
15 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/famijia/famijia_checkin.js, tag=Fa米家_每日签到, enabled=true
```

## 获取Cookie

Fa米家APP - 我的 - (滚动到底部)常用服务 -  签到