# 安全重定向

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-MITM--HOSTNAME合并-brightgreen) ![](https://shields.io/badge/-安全重定向-c07ce3) ![](https://shields.io/badge/-正则推导HOSTNAME-033da7) 

本项目的安全重定向规则由《RULE GENERATOR 规则生成器》自动生成。

所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的相关服务，并确保在使用过程中符合相关法律法规。
## 规则说明
重定向的操作一直存在跳转到钓鱼网站导致信息泄露的风险。

所以增加安全重定向，在原先重定向规则的基础上，只有主域名相同才允许重定向。主域名不同的重定向会被暂存在后台，直到手动确认后才会添加。手动确认的频率看时间、精力和心情，几天到几个月不等。

举个例子，可以从 http://www.jd.com 重定向到 https://www.jd.com ，但是不允许从 http://www.360buy.com 重定向到 https://www.jd.com，直到手动确认安全。

需要注意的是，安全重定向只是尽量确保重定向的安全性，但不代表使用安全重定向就可以高枕无忧，更不代表本项目对安全重定向的使用结果负责。因为即使经过人工核验，依旧有可能因为目标网站被挂马、域名到期被抢注等导致不可知的安全风险。

实际上，绝大多数的重定向都是不必要的。

## 规则统计

最后更新时间：2024-07-03 16:18:44

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| REDIRECT | 60  | 
| MITM | 122  | 
| TOTAL | 182  | 


## QuantumultX 

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/QuantumultX/SafeRedirect/SafeRedirect.conf

## 子规则

当前分流规则，未包含其他子规则。


## 数据来源

当前规则未直接引用数据源。

## 最后

### 感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)**

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。