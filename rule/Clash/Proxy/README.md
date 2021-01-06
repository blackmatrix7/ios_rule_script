# Proxy

## 前言

本项目的Proxy分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Proxy分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-07 03:00:06。

## 规则统计

总计规则：28022 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 27894 |
| DOMAIN | 1 |
| DOMAIN-KEYWORD | 30 |
| IP-CIDR | 94 |
| IP-CIDR6 | 3 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Clash 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy.yaml

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Domain.yaml

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Proxy/Proxy.yaml

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Proxy/Proxy_Domain.yaml

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

Proxy分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Adobe)    | 34   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   73.53% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Advertising)    | 56524   | [163](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.29% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingTest)    | 73881   | [197](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.27% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingLite)    | 25792   | [57](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.22% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Apple)    | 35   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   34.29% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/iCloud)    | 51   | [30](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   58.82% |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleBlock)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [AppleNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleNews)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   12.5% |
|  [Bahamut](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Bahamut)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BlackList)    | 768   | [755](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   98.31% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Blizzard)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/China)    | 596   | [107](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   17.95% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaTest)    | 72486   | [156](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.22% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Cloudflare)    | 15   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   6.67% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Discord)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Dubox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Dubox)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Facebook)    | 25   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   64.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PayPal)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Steam)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   56.25% |
|  [WildRift](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/WildRift)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SteamCN)    | 14   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   28.57% |
|  [Rockstar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Rockstar)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Game)    | 56   | [21](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   37.5% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Google)    | 122   | [66](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   54.1% |
|  [GoogleDriver](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/GoogleDriver)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YouTube)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Microsoft)    | 88   | [56](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   63.64% |
|  [OneDriver](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/OneDriver)    | 17   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   47.06% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Niconico)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Speedtest)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   25.0% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Telegram)    | 20   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   65.0% |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Netflix)    | 38   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   21.05% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TikTok)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Disney)    | 6   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Global)    | 820   | [690](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   84.15% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/GlobalMedia)    | 244   | [113](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   46.31% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Github)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spotify)    | 7   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   57.14% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spark)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Sony)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Sina)    | 10   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   10.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Scholar)    | 76   | [36](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   47.37% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Privacy)    | 2816   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.07% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Twitter)    | 11   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Instagram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Instagram)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Wikipedia)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Whatsapp)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TeamViewer)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Alibaba)    | 34   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   2.94% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Amazon)    | 24   | [23](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   95.83% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BBC)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Baidu)    | 12   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   16.67% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Developer)    | 23   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   95.65% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Lan)    | 23   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   4.35% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的Proxy分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Proxy分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/foreign.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/proxy.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list


感谢以上分流规则作者的辛勤付出（排名不分先后）。

如果您有更好的分流规则，欢迎提交给我，我会将它加到数据源中继续完善。

## 程序特点

### 断链处理

对于某些已删除或失效的数据源，继续使用本地缓存的文件，减少因为断链造成的影响。

### 规则过滤

通过关键字、正则、模糊匹配三种方式对规则进行过滤，以移除部分数据源中的错误规则。

### 合并去重

不仅对完全相同的规则进行去重，还会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6等规则间的包含关系进行合并去重。

### 域名解析

对DOMAIN类型的规则进行DNS解析记录查询，丢弃连续多次无法解析的域名。

### 正则合并

通过程序对相似正则进行合并，不定时手动核验正则合并结果。

### 正则推导

通过程序对含有正则的规则，推导需要MITM的主机名，不定时手动核验推导结果。

### 正则编译

通过程序对正则类型的规则进行编译，去除无法通过编译的正则。

## 最后

### 完善规则

如果您：

1. 有更优的原始规则数据
2. 有更多的黑名单规则数据
3. 有更好的优化建议
4. 在使用分流规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Proxy分流规则。

感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议

### 其他问题

爬虫开发的初衷是为满足自己几方面需求：

1. 去除混用多个去广告规则造成的重复
2. 去除多个去广告规则中某些规则
3. 多个分流规则间重复情况检查
4. 定时同步数据源更新

本项目的分流规则还是以自用为主，请不要对外宣传此分流规则。所以，还是请低调使用吧。