# 🧸 ChinaIPsBGP

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) 

ChinaIPsBGP规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
应 https://github.com/blackmatrix7/ios_rule_script/issues/365 增加的ChinaIPS规则

原作者仓库 https://github.com/misakaio/chnroutes2

这里仅作备份，及进行各种客户端格式的转换

## 规则统计

最后更新时间：2024-09-26 02:13:18

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| IP-CIDR | 3222  | 
| TOTAL | 3222  | 


## Shadowrocket 

#### 使用说明
- ChinaIPsBGP.list，请使用RULE-SET。
- ChinaIPsBGP_Resolve.list，请使用RULE-SET。

#### 文件区别
- ChinaIPsBGP_Resolve.list与ChinaIPsBGP.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- ChinaIPsBGP.list 单独使用。
- ChinaIPsBGP_Resolve.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/ChinaIPsBGP/ChinaIPsBGP.list

## 子规则/排除规则


当前分流规则，未包含其他子规则。

## 数据来源

《ChinaIPsBGP》的数据来自以下链接，如与本项目的《ChinaIPsBGP》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/misakaio/chnroutes2/master/chnroutes.txt


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。