# AllInOne

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN与DOMAIN--KEYWORD合并-9cf) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) ![](https://shields.io/badge/-MITM--HOSTNAME合并-brightgreen) ![](https://shields.io/badge/-正则推导HOSTNAME-033da7) 

本项目的AllInOne规则由《RULE GENERATOR 规则生成器》自动生成。

所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的相关服务，并确保在使用过程中符合相关法律法规。
## 规则说明
汇总Advertising重写去广告、AdvertisingScript通过脚本去除广告、Redirect重定向重写。

QuantumultX需要添加部分分流规则才能生效，具体配置请参照数据源说明。

重写汇总内容，需要自行确认安全性。

## 规则统计

最后更新时间：2024-07-09 02:14:12

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 5  | 
| HTTP-REQUEST-SCRIPT | 1  | 
| HTTP-RESPONSE-SCRIPT | 25  | 
| REDIRECT | 8  | 
| REJECT | 669  | 
| MITM | 704  | 
| FORCE-HTTP-ENGINE-HOSTS | 6  | 
| TOTAL | 1418  | 


## Stash 

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Stash/AllInOne/AllInOne.stoverride

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rewrite/Stash/AllInOne/AllInOne.stoverride

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Stash/AllInOne/AllInOne.stoverride

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Stash/AllInOne/AllInOne.stoverride

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rewrite/Stash/AllInOne/AllInOne.stoverride

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Stash/AllInOne/AllInOne.stoverride

## 子规则

当前分流规则，未包含其他子规则。


## 数据来源

《AllInOne》的数据来自以下链接，如与本项目的《AllInOne》规则混合使用，可能造成部分重写重复。

- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.sgmodule
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.qxrewrite
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Upgrade/Upgrade.qxrewrite
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Rewrite/Rewrite.list
- https://raw.githubusercontent.com/GFBG-IT/QuantumultX/main/Advertising.conf
- https://raw.githubusercontent.com/Tartarus2014/Loon-Script/master/Plugin/Block/Advertising.plugin
- https://raw.githubusercontent.com/ddgksf2013/Rewrite/master/AdBlock/StartUp.conf
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zheye/zheye.lnplugin
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.lnplugin
- https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/rewrite/cleanup.snippet
- https://raw.githubusercontent.com/zwf234/rules/master/QuantumultX/tailadv.conf
- https://raw.githubusercontent.com/ddgksf2013/Rewrite/master/AdBlock/Applet.conf


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)**

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。