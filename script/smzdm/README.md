# 什么值得买

## 特别说明

什么值得买执行任务时，对每次任务的时间间隔有一定的要求，过短的时间间隔可能会没有任何奖励。如果在短时间内并行发起大量请求的话，严重的情况会导致账号异常，需要修改密码。所以在每次执行任务时，都加入了3秒的休眠时间，这会导致脚本的执行时间需要非常长，差不多1分钟左右。请把脚本超时时间设置到最长，建议2分钟以上，以免因为超时被强制中断。

2021年1月18日

实测会引起账号异常，无法参与幸运屋抽奖，其他功能暂未发现异常，不在意抽奖的可以继续使用，在意抽奖的请谨慎考虑。**目前将签到和任务拆分为两个脚本，仅需要签到使用signin脚本即可。**

## 最近更新

2020年12月22日：

适配最新的个人中心返回Html格式。

去除威望显示，现在获取不到威望这个属性了。

去除完成点击“去购买”的任务的功能，现在只能在APP端操作才有经验。现在每日经验约有40左右。什么值得买官方完全有办法封禁所有的Web端完成任务功能，现在还能执行部分任务纯属官方放水，且用且珍惜吧，不保证哪一天就没办法通过脚本完成任务了。

## 签到与每日任务

什么值得买Web端和App端每日自动签到脚本，并且完成每日点击去购买10次、点值5次、点赞5次、收藏5次的任务。

执行效果如下，会显示昵称、级别、经验值变动总数、经验值变动明细、任务完成情况。

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/images/01.png)

### 配置说明

#### Surge

##### **安装模块**

Surge推荐使用模块进行部署，模块地址：https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_signin.sgmodule

### Loon

**远程脚本**

直接在配置里修改

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_signin.lnscript, tag=什么值得买_每日签到, enabled=true
```

### Quantumult X

远程复写配置

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_signin.qxrewrite, tag=什么值得买_获取Cookie, update-interval=86400, opt-parser=false, enabled=true

[task_local]
5 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_signin.js, tag=什么值得买每日签到
```

### 使用说明

#### **Web端获取Cookie：**

使用Safari，不要使用第三方浏览器！

使用手机浏览器访问 https://zhiyou.smzdm.com/ 进行一次登录，通常会显示获取cookie成功。

可能因为重定向的问题，登录成功后访问的不是https://zhiyou.smzdm.com/user/ ，则重新在浏览器中访问一次https://zhiyou.smzdm.com/user/ 即可。

如果还是没有获取到Cookie，请查阅Surge等第三方App的执行日志。

## 去广告

去除什么值得买首页、好价、好文内的广告

### 配置说明

#### Surge

##### 配置文件

在配置文件中修改。

```ini
[MITM]
hostname = homepage-api.smzdm.com, haojia-api.smzdm.com, article-api.smzdm.com

[Script]
什么值得买_首页去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/homepage-api.smzdm.com\/home,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
什么值得买_好价去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/haojia-api.smzdm.com\/home\/list,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
什么值得买_好文去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/article-api.smzdm.com\/article\/index_home_page,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
```

##### 模块安装

模块地址： https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.sgmodule

### Loon

**远程脚本**

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.lnscript, tag=什么值得买_去广告, enabled=true
```

### Quantumult X

**远程复写脚本**

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.qxrewrite, tag=什么值得买_去广告, update-interval=86400, opt-parser=false, enabled=true
```

## 统一推送

MagicJS利用Bark，实现了跨设备的统一推送能力，将多个iOS设备的脚本执行结果，统一推送到一个设备上。

执行效果图，以饿了么为例：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/eleme/images/bark.jpg)

### 开启统一推送

你需要安装Bark这个APP，打开后可以得到类似这样的链接：

```http
https://api.day.app/VXTWvaQ18N29bsQAg7DgkT
```

在Surge、Loon、QuantumultX中执行以下代码，将链接写入(如何执行代码请自己动手解决)。

**Surge、Loon**

```javascript
# 开启所有脚本统一推送
$persistentStore.write("https://api.day.app/VXTWvaQ18N29bsQAg7DgkT", "magicjs_unified_push_url");
```

**Quantumult X**

```javascript
# 开启所有脚本统一推送
$prefs.setValueForKey("https://api.day.app/VXTWvaQ18N29bsQAg7DgkT", "magicjs_unified_push_url");
```

### 关闭统一推送

**Surge、Loon**

```javascript
# 关闭所有脚本统一推送
$persistentStore.write("", "magicjs_unified_push_url");
```

**Quantumult X**

```javascript
# 关闭所有脚本统一推送
$prefs.setValueForKey("", "magicjs_unified_push_url");
```

### 其他

1. 统一推送能力仅对支持的脚本有效。
2. 开启统一推送后，所有支持统一推送的脚本，都会把通知推送到目标设备上。
3. 限于Bark的功能，统一推送中的多媒体和链接不可用。
4. 统一推送需要使用Bark的服务器，推送成功与否，与Bark服务器的可用性有关。
5. 统一推送不会关闭APP的本地推送，即两个iOS设备都会有推送。
6. 如有隐私考虑，可以参考Bark的服务端文档，自建服务端。