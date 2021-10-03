# 知乎助手

## 介绍

去除知乎广告，提供付费内容提醒、黑名单增强等优化阅读体验的功能。

分为Plus和Lite两个版本，Lite只提供最纯粹的去广告功能，Plus带有一些优化阅读体验的功能。

目前已实现 (✨的为Plus版本的功能，❓为过时或即将删除的功能)：

1. 去除知乎的启动广告
2. 去除关注页的广告
3. 去除推荐页的广告
4. 去除回答列表的广告
5. 去除回答列表的圆桌
6. 去除回答页面的广告
7. 去除知乎直播红点
8. 去除知乎指南提示
9. 去除未读消息的红点
11. 拦截知乎内测邀请
12. 去除预置关键字广告
14. 去除热榜内的广告
15. 去除评论区内的广告
14. 去除关注页顶部的最新视频
15. 客户端中显示自己是盐选会员
16. 直接运行脚本可清理客户端内持久化的数据
17. 部分功能支持BoxJS配置(alpha)
18. 付费内容文首提醒✨
19. 推广内容文首提醒✨
20. 拦截部分回答预加载以节约流量✨
21. 去除官方账号的推广消息✨
22. 去除推荐页中黑名单用户的回答✨
23. 去除回答列表中黑名单用户的回答✨
24. 去除关注页顶部的最常访问✨
25. 精简首页顶部的标签页✨
26. 屏蔽消息页面的知乎活动助手✨
27. 新旧版评论区黑名单用户过滤✨
28. 屏蔽转发的黑名单用户的想法✨
29. 推荐页屏蔽关键词解锁✨
30. 知乎网页版去广告 [#21](https://github.com/blackmatrix7/ios_rule_script/issues/21)❓
31. 去除热搜内的广告❓
32. 屏蔽推荐页中的盐选推荐内容❓
33. 拦截知乎下发的配置，如皮肤(alpha)✨❓
34. 减少推荐页内的视频(alpha)✨❓
35. 去除推荐页的付费推荐内容✨❓

## 最近更新

1. 推荐页关键词屏蔽支持正则表达式
2. 加入BoxJS配置开关
3. 提高推荐页屏蔽效率

## 版本切换

**在Lite版本和Plus版本切换时，务必手动运行一次脚本，清理持久化数据，以免影响切换效果。**

清理持久化数据后，如果使用Plus版本，请重新获取黑名单。

## 异常处理

如出现执行异常，通常是由于复写冲突或118.89.204.198这个地址的请求没有正常拦截导致。

建议：

1. 确认除本脚本外，不含有其他第三方关于知乎的复写
2. 抓包确认118.89.204.198这个地址的请求已被正确拦截

**如果无法拦截118.89.204.198的请求，会导致绝大多数功能失效，请务必自行调整配置文件，确认正常拦截118.89.204.198。**

建议解决方法：

1. 使用一个不含其他规则的空白配置文件验证效果
2. 将知乎去广告规则的优先级调整到最高
3. 重启知乎
4. 清理知乎的缓存
5. 卸载知乎后重装
6. 直接运行脚本清理持久化数据
7. ~~放弃使用~~

**因为个人精力实现有限，无力处理各种因为复写冲突引起的异常。在反馈异常时，请自行创建一个空白的配置文件，仅含有知乎助手相关内容先进行验证。如果使用空白配置文件确认仍存在问题，提供空白的配置文件、知乎版本、客户端名称和版本，便于复现问题。**

**其他未经过空白配置文件验证、没有版本号等信息，仅有一张图甚至一句话的，不再进行复现测试，请自行解决。**

## 部分功能说明

### BoxJS可选配置(alpha)

部分功能支持BoxJS配置，目前还在测试阶段，配置项可能有所增减。

如果有问题请将日志等级设置到DEBUG后提交反馈。

Lite版本请确保所有Plus版本的选项都为关闭状态，以减少不必要的代码执行。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/07.jpg" style="zoom:50%;" />

### 屏蔽关键词解锁

现在非会员和会员都可以在“设置-屏蔽设置-屏蔽关键词”中使用此功能。

**真正的盐选会员，使用此脚本后，会覆盖掉盐选会员的的配置功能，但已配置好的关键词不会失效。如果不需要此功能，可以在BoxJS中永久关闭。**

此功能并非真正解锁会员特权，只是借用知乎APP的操作界面，通过脚本实现的关键词屏蔽。如果你已经是尊贵的盐选会员，建议关闭此功能，使用盐选会员自带的关键词屏蔽。

知乎助手的关键词解锁额外提供了正则表达式的屏蔽功能，可以实现一些较复杂的判断逻辑，及提高屏蔽效率。比如关键词设置`男士.*(沐浴露|香水)+`，表示只有“男士”和“沐浴露”或“香水”共同出现时才进行屏蔽。而`(羊毛|优惠|红包)+`，表示“羊毛”、“优惠”、“红包”出现任意一个关键词就进行屏蔽，可以替代原先的羊毛”、“优惠”、“红包”三个关键词，减少关键词数量，提高屏蔽效率。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/06.jpg" style="zoom:50%;" />

#### 小技巧

通过抓包获取推荐页的数据，可以通过正则屏蔽任意内容。

### 付费内容提醒

遇到需要付费阅读的回答时，会**将付费内容的提醒置顶**。避免阅读中途发现内容需要付费的情况，提高阅读体验。

浅色/深色效果如下图：

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/04.jpg" style="zoom:50%;" />

### 推广内容提醒

遇到含有营销推广/购物推广内容的回答时，会将含有推广内容的提醒置顶，自行判断是否继续阅读。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/05.png" style="zoom:50%;" />

### 黑名单增强

知乎的黑名单设计，无法屏蔽黑名单用户的公开信息。将某人拉黑后，他的回答依旧会出现在推荐页和回答列表中。

黑名单增强就是对黑名单用户的回答进行屏蔽，让他的回答从推荐页和回答列表、评论和想法中消失。(如果只为在推荐页屏蔽某人，建议用知乎提供的屏蔽用户的方法，这是在服务器端进行的更加高效的屏蔽。)

黑名单匹配方式为用户名，同名用户都会被屏蔽，“[已重置]”除外。

屏蔽后，如果需要定向查看某个黑名单的用户，请搜索他的名称，然后点进去看他的回答。

#### 自定义黑名单

**首次使用时，需要获取一次完整的黑名单**。请从“我的”-“设置”-“屏蔽设置”-“管理黑名单”，进入黑名单列表。不断往下滑动，直到滑动到列表底部。滑动到底部后，会弹出通知“获取脚本黑名单结束”，表示黑名单获取完成。

**每次重新进入“管理黑名单”功能时，历史黑名单会被清空，必须滑动到底部，保证黑名单获取完成，否则可能会丢失之前的脚本黑名单数据。**

脚本黑名单可以跟随知乎登录账户切换，每次切换知乎不同的账户时，请重新获取一次黑名单。

每次添加或移除黑名单用户，脚本内置的黑名单也会同步更新。

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/01.jpg" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/03.jpg" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/images/02.jpg" style="zoom:50%;" />

## 配置说明(Plus)

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.sgmodule
```

### Loon

使用插件

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.lnplugin, tag=知乎助手_去广告及体验增强, enabled=true
```

### Quantumult X

配置文件

```ini
[filter_local]
# 知乎去广告，以下规则请放置在filter_local最顶部
IP-CIDR,118.89.204.198/32,REJECT
IP6-CIDR,2402:4e00:1200:ed00:0:9089:6dac:96b6/128,REJECT
HOST,118.89.204.198,REJECT
# 知乎去广告，以下规则的位置越前方越好
HOST,appcloud2.in.zhihu.com,REJECT
HOST,mqtt.zhihu.com,reject
HOST,sugar.zhihu.com,reject
USER-AGENT,AVOS*,REJECT

[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.qxrewrite, tag=知乎助手_去广告及体验增强, update-interval=86400, opt-parser=false, enabled=true
```

## 配置说明(Lite)

Plus版本功能较多，需要消耗较多的系统资源。如果出现VPN自动关闭或VPN频繁重启的情况，请使用下面的Lite版本的配置。Lite版本专注于去广告功能，资源开销较小，稳定性更佳。

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.sgmodule
```

### Loon

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.lnplugin, tag=知乎助手_去广告, enabled=true
```

#### Quantumult X

配置文件

```ini
[filter_local]
# 知乎去广告，以下规则请放置在filter_local最顶部
IP-CIDR,118.89.204.198/32,REJECT
IP6-CIDR,2402:4e00:1200:ed00:0:9089:6dac:96b6/128,REJECT
HOST,118.89.204.198,REJECT
# 知乎去广告，以下规则的位置越前方越好
HOST,appcloud2.in.zhihu.com,REJECT
HOST,mqtt.zhihu.com,reject
HOST,sugar.zhihu.com,reject
USER-AGENT,AVOS*,REJECT

[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.qxrewrite, tag=知乎助手_去广告, update-interval=86400, opt-parser=false, enabled=true
```

## 其他问题

### 脚本内置黑名单

对于脚本内置的黑名单，**保持谨慎和克制的原则**，只加入无法通过加入黑名单进行屏蔽的账号。如需要屏蔽更多的账户，可以由使用者手动将其加入黑名单来实现。

推荐页中脚本内置的黑名单基本上都已去除，只保留”会员推荐“等几个，因为这些都不是账号，不能通过加入黑名单来屏蔽。并且， 会员推荐的屏蔽功能，只有在你获取过一次黑名单后才会生效。如果你用的是Lite版本，完全不用担心屏蔽问题。

官方消息中脚本内置的黑名单也仅保留无法加入黑名单的营销账号，其他的如果需要屏蔽，手动把它们加入黑名单就好。

### Quantumult X 偶尔加载失败

参考 https://github.com/blackmatrix7/ios_rule_script/issues/268 。

## 最后

如果能帮上你，麻烦给个Star⭐。如果没能帮上你，麻烦[点击这里反馈给我](https://github.com/codetracer/horus/issues/new)，个人测试覆盖场景有限，你的及时反馈可以让我尽快排查和解决问题。

特别感谢：

[@onewayticket255](https://github.com/onewayticket255/Surge-Script)

[@fiiir](https://github.com/fiiir)

[@LuzMasonj](https://github.com/LuzMasonj)