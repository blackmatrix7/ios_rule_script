# 什么值得买

## 前言

什么值得买的会员体系更新后，连续签到30天加30经验值的福利已经没有，每日签到只能获得2点经验值。以现在的会员升级体系，从V5升级到V6，需要1万的经验值，依靠签到需要连续签到13年半。

所以在原来签到的基础上，增加了每日完成一些任务的功能，这样每日基本上可以获得120左右的经验值。V5升级到V6，只需要84天。

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
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_checkin.loon, tag=什么值得买_每日签到, enabled=true
```

### Quantumult X

远程复写配置

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.quanx, tag=什么值得买_去广告, update-interval=86400, opt-parser=false, enabled=true

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

###### 什么值得买iPhone 9.8.5抓取不到账户名密码

在最新版的什么值得买客户端iPhone 9.8.5(2020-07-13)中，由于请求头声明异常，会导致Quantumult X和Surge的商店版本无法抓取到账户名和密码，Loon抓取正常。这个属于什么值得买客户端的请求不规范导致，修复时间未知。和Quantumlu X作者反馈，作者迅速对这种请求头不规范的情况做了兼容，目前在Qutumult X 1.0.13(348) TF版本中已经可以正常获取到数据。

现阶段的解决办法：

1. 如果有Quantumult X有TF版本，更新至最新版即可
2. 如果使用Loon，没影响
3. 如果使用Surge，降级什么值得买App后抓取 
4. clone 整个项目到本地，在本地脚本里填上预留的用户名密码

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
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.loon, tag=什么值得买_去广告, enabled=true
```

### Quantumult X

**远程复写脚本**

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.quanx, tag=什么值得买_去广告, update-interval=86400, opt-parser=false, enabled=true
```

