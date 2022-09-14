# 🧸什么值得买

## 签到与每日任务

什么值得买签到和任务脚本，每日完成Web端签到、抽奖一次，收藏文章7次。

## 特别说明

### 脚本执行时间

什么值得买执行任务时，对每次任务的时间间隔有一定的要求，过短的时间间隔可能会没有任何奖励。如果在短时间内并行发起大量请求的话，严重的情况会导致账号异常，需要修改密码。所以在每次执行任务时，都加入休眠时间，这会导致脚本的执行时间需要非常长。请把脚本超时时间设置到最长，建议2分钟以上，以免因为超时被强制中断。

### 账号异常

可能会引起账号异常，无法参与幸运屋抽奖，其他功能暂未发现异常，不在意抽奖的可以继续使用，在意抽奖的请谨慎考虑。

## 最近更新

2022年9月8日

1. 合并签到和任务脚本，可以在BoxJS中关闭
2. 增加多账号签到和任务功能

### 配置说明

#### Surge

##### **安装模块**

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_daily.sgmodule
```

### Loon

安装插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_daily.lnplugin
```

### Quantumult X

配置重写

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_daily.qxrewrite, tag=什么值得买_获取Cookie, update-interval=86400, opt-parser=false, enabled=true

[task_local]
5 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_daily.js, tag=什么值得买每日签到
```

## 获取Cookies

**使用Safari，不要使用第三方浏览器！**

使用Safari访问 https://zhiyou.smzdm.com/ 进行一次登录，通常会显示获取Cookie成功。

可能因为重定向的问题，登录成功后访问的不是https://zhiyou.smzdm.com/user/ ，则重新在浏览器中访问一次https://zhiyou.smzdm.com/user/ 即可。

如果还是没有获取到Cookie，请查阅Surge等第三方App的执行日志。

### 多账号获取Cookies

使用浏览器的无痕模式、隐身模式等功能实现不同账号的登录和切换。

## 脚本变量

| 名称                | 类型 | 说明                              |
| ------------------- | ---- | --------------------------------- |
| smzdm_cookie        | Json | 存储什么值得买Cookies             |
| smzdm_cookie_id     | Json | 辅助判断什么值得买Cookies是否变化 |
| smzdm_signin        | Bool | 是否打开什么值得买签到            |
| smzdm_mission       | Bool | 是否打开什么值得买每日任务        |
| smzdm_lottery       | Bool | 是否打开什么值得买每日抽奖        |
| smzdm_sync_qinglong | Bool | 是否同步Cookies至青龙面板         |

## 去广告

去除什么值得买首页、好价、好文内的广告

### 配置说明

#### Surge

使用模块

```ini
 https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.sgmodule
```

### Loon

使用插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.lnplugin
```

### Quantumult X

配置重写

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.qxrewrite, tag=什么值得买_去广告, update-interval=86400, opt-parser=false, enabled=true
```

