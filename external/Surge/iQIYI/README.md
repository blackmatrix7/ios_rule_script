# 爱奇艺每日签到

## 前言

本项目的爱奇艺每日签到复写规则由程序自动维护。

定时爬取互联网上开源的爱奇艺每日签到复写规则，将其进行清洗、去重、合并、转换，以解决引用大量外部复写造成重复问题，或对上游仓库复写进行备份。




## 复写统计

| 类型 | 数量(条) |
| ---- | ---- |
| mitm | 1 |
| force_http_engine_hosts | 0 |
| http-request | 1 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 

实时版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/external/Surge/iQIYI/iQIYI.sgmodule


稳定版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/external/Surge/iQIYI/iQIYI.sgmodule


如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。


## 数据来源

本项目的爱奇艺每日签到复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。如果你正在使用这些复写规则，建议不要与本项目的爱奇艺每日签到复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js


感谢以上复写规则作者的辛勤付出（排名不分先后）。

如果你有更好的复写规则，欢迎提交给我，我会将它加到数据源中继续完善。

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

通过程序含有正则的规则，推导需要MITM的主机名，不定时手动核验推导结果。

### 正则编译

通过程序对正则类型的规则进行编译，去除无法通过编译的正则。

## 最后

### 完善复写

如果你：

1. 有更优的原始复写数据
2. 有更多的黑名单复写数据
3. 有更好的优化建议
4. 在使用复写规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的爱奇艺每日签到复写规则。

感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议