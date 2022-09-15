# 🧸饿了么

饿了么每日自动领取会员任务及吃货豆功能。

领取会员任务，限饿了么会员使用，解决下单前忘记领取会员任务的问题。

自动领取吃货豆，非会员可能能用，我没有非会员账号，无法验证，有兴趣可以自己试试。

## 特别说明

### 获取数据

需要同时获取到Cookie与坐标，脚本才能正常执行，获取方法见后。

### 多选一任务

默认会领取含有“美食外卖”关键字的任务，可以在BoxJS中自定义关键字。

脚本会依次尝试领取所有匹配关键字的任务。但因为多选一的关系，通常只会有第一个任务能成功领取。

## 配置说明

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.sgmodule
```

### Loon

使用插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.lnplugin
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.qxrewrite, tag=饿了么_获取Cookie, enabled=true

[task_local]
05 10 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_daily.js, tag=饿了么_领取吃货豆, enabled=true
```

## 获取数据

### 获取Cookie

打开饿了么APP即可。

**Surge需要关闭MITM over HTTP/2，你可以获取成功后再打开。**

### 获取坐标

打开饿了么APP - 我的 - 赚吃货豆。

由于获取坐标的请求不是每次都触发的，如果没有正确获取到坐标，建议移除饿了么APP后台，间隔10分钟后，再尝试上述操作。

## Bark推送

通过BoxJS，配置Bark推送链接，可以将脚本通知，通过Bark推送到其他设备上。

以饿了么为例：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark.jpg)

在BoxJS中填写Bark推送链接即可。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark_conf.jpg" style="zoom: 33%;" />

## 多账户

目前无法在单台iPhone/iPad设备上实现多账户执行日常任务和领取吃货豆。

多账户更多的作用是在多设备的情况下，将Cookies和坐标同步至青龙面板，由青龙面板执行多账户作业。

## 脚本变量

你可以根据下表，在magic.json中配置所需数据。

| 变量名              | 类型   | 说明                                           |
| ------------------- | ------ | ---------------------------------------------- |
| eleme_cookies       | Json   | 饿了么Cookie                                   |
| eleme_coordinate    | Json   | 饿了么坐标                                     |
| eleme_mission       | Bool   | 是否领取会员任务                               |
| eleme_task_keywords | String | 饿了么任务关键词，含有此关键词的任务才会被领取 |
| eleme_sync_qinglong | Bool   | 是否同步Cookies和坐标到青龙面板                |

部分变量示例

```json
{
    "eleme_cookies": {
   			"magic_session": true,
        "UserId1": "Cookie1",
        "UserId2": "Cookie2"
    },
    "eleme_coordinate": {
   			"magic_session": true,
        "UserId1": {"longitude": "xxxxxxxxxxxx", "latitude": "xxxxxxxxxxxxxx"},
        "UserId2": {"longitude": "xxxxxxxxxxxx", "latitude": "xxxxxxxxxxxxxx"}
    }
}
```

