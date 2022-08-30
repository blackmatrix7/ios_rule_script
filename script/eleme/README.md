# 饿了么

饿了么每日自动领取会员任务，及自动领取吃货豆功能。

领取会员任务，限饿了么会员使用，解决忘记领取会员任务再下单的问题。

自动领取吃货豆，非会员可能能用，我没有非会员账号，无法验证，有兴趣可以自己试试。

## 特别说明

### 获取数据

需要同时获取到Cookie与坐标，脚本才能正常执行，获取方法见后。

### 多选一任务

脚本会依次尝试领取所有任务。但因为多选一的关系，通常只会有第一个任务能成功领取。

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
05 10 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/eleme_mission.js, tag=饿了么_领取会员任务, enabled=true
```

## 获取数据

### 获取Cookie

打开饿了么APP即可。

### 获取坐标

打开饿了么APP - 我的 - 赚吃货豆。

由于获取坐标的请求不是每次都触发的，如果没有正确获取到坐标，建议移除饿了么APP后台，间隔10分钟后，再尝试上述操作。

或者通过其他途径获取自身坐标，通过BoxJS填入。

## Bark推送

通过BoxJS，配置Bark推送链接，可以将脚本通知，通过Bark推送到其他设备上。

以饿了么为例：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark.jpg)

在BoxJS中填写Bark推送链接即可。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark_conf.jpg" style="zoom: 33%;" />

## 青龙面板

MagicJS所有的变量，都存储在脚本同级目录下的`magic.json`文件中，不支持通过环境变量读取变量。

在青龙面板中，在左侧菜单选择脚本管理，新建 `magic.json` 文件(文件名不可修改)。

写入如下json：

```json
{
    "eleme_app_cookie": "xxxxxxxxxxxxxxxxx",
    "eleme_app_longitude": "111.1111111111",
    "eleme_app_latitude": "111.1111111111",
    "eleme_task_keywords": "美食外卖",
    "bark_url": "https://api.day.app/xxxxxxxxxxxxxxxxxx/"
}
```

变量说明

| 变量名              | 说明                                           |
| ------------------- | ---------------------------------------------- |
| eleme_app_cookie    | 饿了么Cookie                                   |
| eleme_app_longitude | 饿了么经度                                     |
| eleme_app_latitude  | 饿了么纬度                                     |
| eleme_task_keywords | 饿了么任务关键词，含有此关键词的任务才会被领取 |
| bark_url            | Bark推送地址                                   |

如果你正在使用多个由MagicJS支持的脚本，可以将变量写在同一个`magic.json`文件中，例如：

```json
{
    "smzdm_cookie": "xxxxxxxxxxxxxxxxxxxxx",
    "smzdm_session": "xxxxxxxxxxxxxxxxxxxxx",
    "eleme_app_cookie": "xxxxxxxxxxxxxxxxx",
    "eleme_app_longitude": "111.1111111111",
    "eleme_app_latitude": "111.1111111111",
    "eleme_task_keywords": "美食外卖",
    "bark_url": "https://api.day.app/xxxxxxxxxxxxxxxxxx/"
}
```

