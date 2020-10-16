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
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/tieba/tieba_checkin.loonscript, tag=贴吧_每日签到, enabled=true
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