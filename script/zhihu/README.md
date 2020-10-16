# 知乎助手

## 介绍

去除知乎广告，提供付费内容提醒、黑名单增强等优化阅读体验的功能。

分为Plus和Lite两个版本，Lite只提供最纯粹的去广告功能，Plus带有一些优化阅读体验的功能。

目前已实现(带✨的为Plus版本的功能)：

1. 去除知乎开屏的广告
2. 去除关注列表的广告
3. 去除推荐列表的广告
4. 去除回答列表的广告
5. 去除回答列表的圆桌
6. 去除回答页面的广告
7. 去除知乎直播红点
8. 去除知乎指南提示
9. 去除未读消息的红点
10. 拦截知乎内测邀请(beta)
11. 去除预置关键字广告(beta)
12. 付费内容文首提醒(beta)✨
13. 推广内容文首提醒(beta)✨
14. 拦截部分回答预加载以节约流量✨
15. 去除推荐列表的付费推荐内容✨
16. 去除官方账号的推广消息✨
17. 去除推荐列表中黑名单用户的回答✨
18. 去除回答列表中黑名单用户的回答✨
19. 去除关注列表顶部的最常访问✨

## 最近更新

1. 修复想法不存在的问题
2. 营销内容文首提醒
3. 部分功能支持Shadowrocket TF 2.1.62(1071)+
4. 脚本黑名单跟随登录用户切换，需要重新获取黑名单。
5. 拦截部分回答预加载以节约流量
6. 屏蔽推荐列表中的直播
7. 付费内容文首提醒

## 特别说明

如出现执行异常，绝大部分是因为引用过多的去广告规则，规则之间互相冲突覆盖导致。

建议解决方法：

1. 使用一个不含其他规则的空白配置文件验证去广告效果
2. 将知乎去广告规则的优先级调整到最高
3. 重启知乎
4. 清理知乎的缓存
5. 卸载知乎后重装
6. 安装已经验证过的版本

## 去广告

对知乎内置的部分广告进行去除，目前验证情况如下：

**2020年9月23日：**

知乎 V6.57.0(2708)

Surge 4.10.0(1819) TF  验证通过，Shadowrocket 2.1.62(1092) TF 纯去广告功能验证通过。

**2020年9月18日：**

知乎 V6.56.0(2676)

Loon TF 2.1.3(204)  验证通过。

**2020年8月22日：**

知乎 V6.52.0(2548)

Surge4.10.0(1800) TF、Quantumult X 1.0.14(367) TF、Loon 2.1.3(197) TF  验证通过。

**2020年8月8日：**

知乎 V6.51.1(2518)

Surge4.10.0(1788) TF、Quantumult X 1.0.14(359) TF、Loon 2.1.3(191) TF 验证通过。

## 付费内容提醒(beta)

遇到需要付费阅读的回答时，会**将付费内容的提醒置顶**。避免阅读中途发现内容需要付费的情况，提高阅读体验。

浅色/深色效果如下图：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/04.jpg)

## 推广内容提醒(beta)

遇到含有营销推广/购物推广内容的回答时，会将含有推广内容的提醒置顶，自行判断是否继续阅读。

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/05.png)

## 黑名单增强

知乎的黑名单设计，无法屏蔽黑名单用户的公开信息。将某人拉黑后，他的回答依旧会出现在推荐列表和回答列表中。

黑名单增强就是对黑名单用户的回答进行屏蔽，让他的回答从推荐列表和回答列表中消失。(如果只为在推荐列表屏蔽某人，建议用知乎提供的屏蔽用户的方法，这是在服务器端进行的更加高效的屏蔽。)

黑名单匹配方式为用户名，同名用户都会被屏蔽，“[已重置]”除外。

屏蔽后，如果需要定向查看某个黑名单的用户，请搜索他的名称，然后点进去看他的回答。

#### 自定义黑名单

**首次使用时，需要获取一次完整的黑名单**。请从“我的”-“设置”-“屏蔽设置”-“管理黑名单”，进入黑名单列表。不断往下滑动，直到滑动到列表底部。滑动到底部后，会弹出通知“获取脚本黑名单结束”，表示黑名单获取完成。

脚本黑名单可以跟随知乎登录账户切换，每次切换知乎不同的账户时，请重新获取一次黑名单。

每次添加或移除黑名单用户，脚本内置的黑名单也会同步更新。

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/01.jpg)

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/03.jpg)

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/02.jpg)

## 配置说明(Plus)

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.sgmodule
```

### Loon

Loon 2.1.3(193) TF + 可以使用插件Plugin。

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.loonplugin, tag=知乎助手_去广告及体验增强, enabled=true
```

### Quantumult X

配置文件

```ini
[filter_local]
# 知乎去广告
DOMAIN,118.89.204.198,REJECT
DOMAIN-SUFFIX,118.89.204.198,REJECT
DOMAIN-KEYWORD,118.89.204.198,REJECT
IP-CIDR,118.89.204.198/32,REJECT
USER-AGENT,AVOS*,REJECT
DOMAIN-SUFFIX,appcloud2.zhihu.com,REJECT
DOMAIN-SUFFIX,appcloud2.in.zhihu.com,REJECT

[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.quanx, tag=知乎助手_去广告及体验增强, update-interval=86400, opt-parser=false, enabled=true
```

### Shadowrocket (alpha)

Plus版本在Shadowrocket下运行可能会出现部分功能不可用，甚至VPN自动关闭的情况。所以Plus版本暂不支持Shadowrocket，建议使用Lite版本配置。

## 配置说明(Lite)

Plus版本功能较多，需要消耗较多的系统资源。如果出现VPN自动关闭或VPN频繁重启的情况，请使用下面的Lite版本的配置。Lite版本专注于去广告功能，资源开销较小，稳定性更佳。

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.sgmodule
```

### Loon

Loon 2.1.3(193) TF + 可以使用插件Plugin。

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.loonplugin, tag=知乎助手_去广告, enabled=true
```

#### Quantumult X

配置文件

```ini
[filter_local]
# 知乎去广告
DOMAIN,118.89.204.198,REJECT
DOMAIN-SUFFIX,118.89.204.198,REJECT
DOMAIN-KEYWORD,118.89.204.198,REJECT
IP-CIDR,118.89.204.198/32,REJECT
USER-AGENT,AVOS*,REJECT
DOMAIN-SUFFIX,appcloud2.zhihu.com,REJECT
DOMAIN-SUFFIX,appcloud2.in.zhihu.com,REJECT

[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.quanx, tag=知乎助手_去广告, update-interval=86400, opt-parser=false, enabled=true
```

#### Shadowrocket (alpha)

小火箭的支持为测试功能，可能出现如VPN关闭、VPN重启、知乎无法显示内容等奇怪情况，请权衡使用。

```ini
[Rule]
# 知乎去广告
DOMAIN,118.89.204.198,REJECT
DOMAIN-SUFFIX,118.89.204.198,REJECT
DOMAIN-KEYWORD,118.89.204.198,REJECT
IP-CIDR,118.89.204.198/32,REJECT,no-resolve
DOMAIN,appcloud2.zhihu.com,REJECT
DOMAIN,appcloud2.in.zhihu.com,REJECT
USER-AGENT,AVOS*,REJECT
URL-REGEX,^https?:\/\/api\.zhihu\.com\/(notifications\/v3\/count|v3\/package|me\/guides|drama\/living-info|ad|fringe|commercial|market\/popovers|search\/(top|tab)|.*featured-comment-ad|appview\/api\/v\d\/answers\/\d+\/recommendations),REJECT

[Script]
知乎_处理用户信息 = type=http-response,requires-body=1,max-size=0,pattern=^https?:\/\/api\.zhihu\.com\/people\/,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.js
知乎_信息流去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https?:\/\/api\.zhihu\.com\/(moments|topstory)(\/|\?)?(recommend|action=|feed_type=),script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.js
知乎_回答列表去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https?:\/\/api\.zhihu\.com\/v4\/questions,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.js

[MITM]
enable = true
hostname=www.zhihu.com,api.zhihu.com
```

## 其他问题

### 脚本内置黑名单

对于脚本内置的黑名单，**保持谨慎和克制的原则**，只加入无法通过加入黑名单进行屏蔽的账号。如需要屏蔽更多的账户，可以由使用者手动将其加入黑名单来实现。

推荐列表中脚本内置的黑名单基本上都已去除，只保留”会员推荐“等几个，因为这些都不是账号，不能通过加入黑名单来屏蔽。并且， 会员推荐的屏蔽功能，只有在你获取过一次黑名单后才会生效。如果你用的是Lite版本，完全不用担心屏蔽问题。

官方消息中脚本内置的黑名单也仅保留无法加入黑名单的营销账号，其他的如果需要屏蔽，手动把它们加入黑名单就好。

### 知乎直播无法访问

知乎去广告配置**不会导致知乎直播无法访问**。目前已知部分整合的去广告规则集合，会导致知乎直播无法访问。

如果出现知乎直播无法访问的情况，请开启抓包/调试/记录日志等功能，确认是哪条规则影响知乎直播的正常访问，将其删除或编写修正规则覆盖掉它。

如果没办法修改第三方的规则，提供几个修正方案。

#### Surge/Loon

Surge和Loon的知乎直播修正，提供两种方案。

一种是在本地规则中修改，覆盖掉远程引用的规则集，适用于远程规则集配置错误导致知乎直播无法访问的情况。

```ini
[Rule]
# 知乎直播修正
URL-REGEX,^https?:\/\/api\.zhihu\.com\/drama\/,DIRECT
```

一种是在url复写中进行修改，覆盖掉远程的订阅复写，适用于Loon远程订阅复写配置错误导致知乎直播无法访问的情况。

```ini
[URL Rewrite]
# 知乎直播修正
^https?:\/\/api\.zhihu\.com\/drama\/ https://api.zhihu.com/drama/ header
```

如果远程错误的规则是在模块或插件中的，由于模块和插件优先级很高，上面的修正可能不会生效，建议联系插件作者修改。

#### Quantumult X

增加一条本地复写规则，覆盖掉远程的复写规则

```ini
# 知乎直播修正
^https?:\/\/api\.zhihu\.com\/drama url 307 https://api.zhihu.com/drama
```

### 想法不存在

已修复，具体原因 https://github.com/blackmatrix7/ios_rule_script/issues/17

## 最后

如果能帮上你，麻烦给个Star⭐。如果没能帮上你，麻烦[点击这里反馈给我](https://github.com/blackmatrix7/ios_rule_script/issues/new)，个人测试覆盖场景有限，你的及时反馈可以让我尽快排查和解决问题。

特别感谢：

[@onewayticket255](https://github.com/onewayticket255/Surge-Script)

[@fiiir](https://github.com/fiiir)