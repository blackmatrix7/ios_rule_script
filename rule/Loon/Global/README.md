# Global

## 前言

本项目的Global分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Global分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。


最后检查时间：2020-10-19 11:32:37。

## 规则统计

总计规则：841 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 60 |
| DOMAIN-KEYWORD | 18 |
| DOMAIN-SUFFIX | 692 |
| IP-CIDR | 29 |
| IP-CIDR6 | 3 |
| URL-REGEX | 1 |
| USER-AGENT | 38 |
## 重复统计

Global分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Adobe.list)   |   2.94%  |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Advertising)    | 140101   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Advertising.list)   |   0.00%  |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest)    | 150581   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/AdvertisingTest.list)   |   0.00%  |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 44380   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/AdvertisingLite.list)   |   0.00%  |
|  [AppStore](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AppStore)    | 2   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/AppStore.list)   |   100.00%  |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 50   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Apple.list)   |   4.00%  |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AppleBlock)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/AppleBlock.list)   |   100.00%  |
|  [Bahamut](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Bahamut)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Bahamut.list)   |   100.00%  |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 777   | [235](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/BlackList.list)   |   30.24%  |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 598   | [4](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/China.list)   |   0.67%  |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Discord)    | 6   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Discord.list)   |   50.00%  |
|  [Dubox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dubox)    | 2   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Dubox.list)   |   100.00%  |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Facebook)    | 25   | [25](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Facebook.list)   |   100.00%  |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PayPal)    | 5   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/PayPal.list)   |   60.00%  |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Steam)    | 16   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Steam.list)   |   6.25%  |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Game)    | 28   | [4](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Game.list)   |   14.29%  |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 64   | [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Google.list)   |   87.50%  |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 14   | [9](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/YouTube.list)   |   64.29%  |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 98   | [9](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Microsoft.list)   |   9.18%  |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Niconico)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Niconico.list)   |   100.00%  |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Speedtest)    | 5   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Speedtest.list)   |   20.00%  |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Telegram)    | 20   | [16](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Telegram.list)   |   80.00%  |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Netflix)    | 40   | [28](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Netflix.list)   |   70.00%  |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Disney)    | 7   | [6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Disney.list)   |   85.71%  |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 296   | [193](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/GlobalMedia.list)   |   65.20%  |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Github)    | 6   | [4](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Github.list)   |   66.67%  |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spotify)    | 8   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Spotify.list)   |   87.50%  |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 4   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Spark.list)   |   50.00%  |
|  [TestFlight](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TestFlight)    | 3   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/TestFlight.list)   |   33.33%  |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Twitter)    | 11   | [10](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Twitter.list)   |   90.91%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 5984   | [514](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Proxy.list)   |   8.59%  |
|  [YouTubeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTubeMusic)    | 4   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/YouTubeMusic.list)   |   50.00%  |
|  [Instagram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Instagram)    | 2   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Instagram.list)   |   100.00%  |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wikipedia)    | 12   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global/Repeat/Wikipedia.list)   |   41.67%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Global/Global.list

## 数据来源

本项目的Global分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Global分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list


感谢以上分流规则作者的辛勤付出（排名不分先后）。

如果您有更好的分流规则，欢迎提交给我，我会将它加到数据源中继续完善。

## 最后

### 正则过滤

爬虫程序在清洗原始规则数据时，可根据正则定向过滤规则，以达到保留特定规则的目的。经过正则过滤的规则，无法100%涵盖原始规则数据，请知悉。

### 黑名单

爬虫程序内置部分规则黑名单，在对原始数据进行清洗时，自动将可能引起异常的黑名单规则去除。经过黑名单去除的规则，无法100%涵盖原始规则数据，请知悉。

### 完善规则

如果您：

1. 有更优的原始规则数据
2. 有更多的黑名单规则数据
3. 有更好的优化建议
4. 在使用分流规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Global分流规则。

感谢

[@zjcfynn](https://github.com/zjcfynn) [@Tartarus2014](https://github.com/Tartarus2014)

提供规则数据源及改进建议

### 其他问题

爬虫开发的初衷是为满足自己几方面需求：

1. 去除混用多个去广告规则造成的重复
2. 去除多个去广告规则中某些规则
3. 多个分流规则间重复情况检查
4. 定时同步数据源更新

本项目的分流规则还是以自用为主，请不要对外宣传此分流规则。所以，还是请低调使用吧。