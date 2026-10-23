# 🧸 游戏

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) 

游戏规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
含有Steam、Blizzard、Discord、Rockstar等分流规则

## 规则统计

最后更新时间：2026-10-24 04:55:18

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 8  | 
| DOMAIN-KEYWORD | 4  | 
| DOMAIN-SUFFIX | 542  | 
| IP-CIDR | 58  | 
| TOTAL | 612  | 


## Shadowrocket 

#### 使用说明
- Game.list，请使用RULE-SET。
- Game_Resolve.list，请使用RULE-SET。

#### 文件区别
- Game_Resolve.list与Game.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- Game.list 单独使用。
- Game_Resolve.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Game/Game.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Shadowrocket/Game/Game.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Game/Game.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/Game/Game.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Shadowrocket/Game/Game.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/Game/Game.list

## 子规则/排除规则

当前分流规则，已包含以下子规则，除非特殊需求否则不建议重复引用：
| 子规则  |  |  |  |  | 
| ---- | ---- | ---- | ---- | ----  |
| Battle | Blizzard | Classic | DiabloIII | EA  | 
| Epic | Garena | Gog | Hearthstone | HeroesoftheStorm  | 
| Nintendo | OP | Overwatch | PlayStation | Purikonejp  | 
| Riot | Rockstar | StarCraftII | Steam | SteamCN  | 
| Supercell | UBI | WildRift | WorldofWarcraft | Xbox  | 


## 数据来源

《游戏》的数据来自以下链接，如与本项目的《游戏》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Games/GamesAll.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Blizzard.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Steam.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Steam.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Rockstar/Rockstar.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Rockstar.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/PlayStation/PlayStation.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/PlayStation.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Games/Epic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Epicgames.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/SteamCN.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Games/WildRift.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/EA.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Garena.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Gog.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Nintendo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/OP.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Purikonejp.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Riot.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/UBI.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Game/Xbox.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Garena.list
- https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Steam.yaml
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Clash-RuleSet-Classical/PROXY/Garena.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Blizzard.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Epic.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Xbox.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Blizzard.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Epic.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Steam.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/SteamCN.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Xbox.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Nintendo.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Nintendo.list


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。