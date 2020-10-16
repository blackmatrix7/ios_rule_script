# 叮咚买菜

叮咚买菜每日自动签到

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/dingdong/dingdong_checkin.sgmodule

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/dingdong/dingdong_checkin.lnscript, tag=叮咚买菜_每日签到, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/dingdong/dingdong_checkin.qxrewrite, tag=叮咚买菜_获取Cookie, enabled=true

[task_local]
20 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/dingdong/dingdong_checkin.js, tag=叮咚买菜_每日签到, enabled=true
```

## 获取Cookie

叮咚买菜APP - 我的 - 右上角签到