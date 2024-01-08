# 🧸 知乎广告拦截

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) ![](https://shields.io/badge/-MITM--HOSTNAME合并-brightgreen) ![](https://shields.io/badge/-正则推导HOSTNAME-033da7) 

知乎广告拦截规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
本分流规则，需要搭配 https://github.com/blackmatrix7/ios_rule_script/tree/master/script/zhihu 使用。

## 规则统计

最后更新时间：2024-01-08 16:00:43

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 3  | 
| IP-CIDR | 1  | 
| IP-CIDR6 | 1  | 
| URL-REGEX | 7  | 
| USER-AGENT | 1  | 
| TOTAL | 13  | 


## Loon 

#### 使用说明
- URL-REGEX类型的规则，在HTTPS协议中，需要配合MITM使用。规则生成器已尝试推导MITM的配置ZhihuAds_MITM.plugin，仅供参考。

#### 文件区别
- ZhihuAds_Resolve.list与ZhihuAds.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- ZhihuAds.list 单独使用。
- ZhihuAds_Resolve.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ZhihuAds/ZhihuAds.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Loon/ZhihuAds/ZhihuAds.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ZhihuAds/ZhihuAds.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ZhihuAds/ZhihuAds.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Loon/ZhihuAds/ZhihuAds.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ZhihuAds/ZhihuAds.list

## 子规则/排除规则


当前分流规则，未包含其他子规则。

## 数据来源

当前规则未直接引用数据源。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。