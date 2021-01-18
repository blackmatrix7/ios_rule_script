# 什么值得买

## 特别说明

什么值得买执行任务时，对每次任务的时间间隔有一定的要求，过短的时间间隔可能会没有任何奖励。如果在短时间内并行发起大量请求的话，严重的情况会导致账号异常，需要修改密码。所以在每次执行任务时，都加入了3秒的休眠时间，这会导致脚本的执行时间需要非常长，差不多1分钟左右。请把脚本超时时间设置到最长，建议2分钟以上，以免因为超时被强制中断。

2021年1月18日

实测会引起账号异常，无法参与幸运屋抽奖，其他功能暂未发现异常，不在意抽奖的可以继续使用，在意抽奖的请谨慎考虑。原因不明，所以即日起下线生活频道抽奖及APP端签到。

## 签到与每日任务

什么值得买Web端和App端每日自动签到脚本，并且完成每日点击去购买10次、点值5次、点赞5次、收藏5次的任务。

执行效果如下，会显示昵称、级别、经验值变动总数、经验值变动明细、任务完成情况。

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/images/01.png)

### 配置说明

#### Surge

##### **安装模块**

Surge推荐使用模块进行部署，模块地址：https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_checkin.sgmodule

### Loon

**远程脚本**

直接在配置里修改

```ini
[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_checkin.lnscript, tag=什么值得买_每日签到, enabled=true
```

### Quantumult X

远程复写配置

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_checkin.qxrewrite, tag=什么值得买_获取Cookie, update-interval=86400, opt-parser=false, enabled=true

[task_local]
5 0 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_checkin.js, tag=什么值得买每日签到
```

### 使用说明

#### **Web端获取Cookie：**

使用手机浏览器访问 https://zhiyou.smzdm.com/ 进行一次登录，通常会显示获取cookie成功。

可能因为重定向的问题，登录成功后访问的不是https://zhiyou.smzdm.com/user/ ，则重新在浏览器中访问一次https://zhiyou.smzdm.com/user/ 即可。

如果还是没有获取到Cookie，请查阅Surge等第三方App的执行日志。

#### **App端获取账号密码：**

打开什么值得买App，点击“我的“-“设置”-“退出登录”，先退出登录。随后点击“我的”中顶部的“立即登录”，选择“账号密码登录”，注意是账号密码登录，不要使用手机快捷登录或其他第三方登录方式。

登录完成后，提示获取账号密码成功，就说明没有问题了。如果没有提示，还是查阅一下第三方App的执行日志。在登录过程中，无论账号密码正确与否，都会进行获取和保存，如果账号密码有错，则重新登录一次即可，脚本会自动更新所保存的账号密码。

以上在什么值得买的iPhone 9.5.17版本测试通过。

##### 隐私说明

因为手机端需要使用账号密码换取token，再通过token签到，所以需要获取一次账号密码。账号密码只会在本地存储，用于发送给“什么值得买”服务端接口用于换取token，不会发送给任何第三方。脚本完全开源，如有疑虑请查阅脚本源码。

##### 存在的问题

###### 什么值得买iPhone 9.8.5及以上版本，抓取不到账户名密码

在最新版的什么值得买客户端iPhone 9.8.5(2020-07-13)中，由于请求头声明异常，会导致Quantumult X和Surge的商店版本无法抓取到账户名和密码，Loon抓取正常。这个属于什么值得买客户端的请求不规范导致，修复时间未知。

和Quantumlu X作者反馈，作者迅速对这种请求头不规范的情况做了兼容，目前在Qutumult X 1.0.13(348) TF版本中已经可以正常获取到数据。

现阶段的解决办法：

1. 如果有Quantumult X有TF版本，更新至最新版即可

2. 如果使用Loon，没影响

3. 如果使用Surge，降级什么值得买App后抓取 

4. clone 整个项目到本地，在本地脚本里填上预留的用户名密码

5. Surge手动写入数据

   ```javascript
   手动执行脚本，写入账号密码数据
   $persistentStore.write("你的账号", "smzdm_account");
   $persistentStore.write("你的密码", "smzdm_password");
   ```

###### App端签到没有收益

目前App端的签到，反复确认没有任何收益，纯粹只是娱乐。Web端和App端同时签到，可能会导致签到失败，显示为主页君繁忙，内置了签到时间间隔和多次重试，一般不会再出现此问题。

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