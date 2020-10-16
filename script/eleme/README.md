# 饿了么

饿了么每日自动领取会员任务，及自动领取吃货豆功能。

领取会员任务，限饿了么会员使用，解决忘记领取会员任务再下单的问题。

自动领取吃货豆，非会员可能能用，我没有非会员账号，无法验证，有兴趣可以自己试试。

## 最近更新

1. 适配饿了么最新的吃货豆活动
2. 增加自动领取吃货豆功能

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.sgmodule

### Loon

使用远程脚本配置

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.lnscript, tag=饿了么_领取会员任务, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.qxrewrite, tag=小米有品_获取Cookie, enabled=true

[task_local]
20 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.js, tag=饿了么_领取会员任务, enabled=true
```

## 获取Cookie

饿了么APP - 我的 - 超级吃货卡