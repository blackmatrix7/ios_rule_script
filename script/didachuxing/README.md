# 嘀嗒出行

嘀嗒出行自动签到和自动拾取贝壳脚本。每日0点10分执行脚本，自动进行当日签到，并显示签到获取的贝壳数量。同时拾取所有贝壳广场中的所有贝壳。

2020.09.03:

贝壳已自动拾取，去除通过脚本拾取贝壳的内容。

2020.08.07：

目前贝壳似乎是自动拾取的，不需要再通过脚本定时获取，所以每天都会提示“没有发现待拾取的贝壳”，目前不影响使用，暂时不做调整，观察一段时间再说。

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didachuxing/didachuxing_plus.sgmodule

### Loon

使用远程脚本

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didachuxing/didachuxing_plus.lnscript, tag=嘀嗒出行_每日签到, enabled=true
```

### Quantumult X

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didachuxing/didachuxing_plus.qxrewrite, tag=嘀嗒出行_获取cookie, enabled=true

[task_local]
10 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/didachuxing/didachuxing_plus.js, tag=嘀嗒出行_每日签到, enabled=true
```

## 使用说明

打开嘀嗒出行App后，进入左侧菜单中的“贝壳广场”，正常情况下会自动获取Cookie。如果没有获取成功，请查阅Surge等第三方App的执行日志。

执行效果图，脚本更新时可能会进行微调。

![](https://github.com/blackmatrix7/ios_rule_script/raw/master/script/didachuxing/images/didachuxing_checkin01.jpg)

