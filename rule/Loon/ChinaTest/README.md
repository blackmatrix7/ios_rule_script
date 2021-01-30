# ChinaTest

## 前言

本项目的ChinaTest分流规则由爬虫程序自动维护。

定时爬取互联网上开源的ChinaTest分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-31 02:54:19。

## 规则统计

总计规则：71535 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 77 |
| DOMAIN-SUFFIX | 71406 |
| USER-AGENT | 32 |
| IP-CIDR | 4 |
| DOMAIN-KEYWORD | 12 |
| IP-CIDR6 | 4 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ChinaTest/ChinaTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ChinaTest/ChinaTest_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

当前分流规则，已包含以下子规则：

- China

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WhiteList)    | 25   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   8.0% |
|  [BiliBili](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BiliBili)    | 62   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   30.65% |
|  [DiDi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DiDi)    | 25   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   52.0% |
|  [Meitu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Meitu)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Pinduoduo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Pinduoduo)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sina)    | 101   | [32](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   31.68% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Baidu)    | 265   | [70](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   26.42% |
|  [360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/360)    | 249   | [66](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   26.51% |
|  [4399](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/4399)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   76.92% |
|  [VipShop](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VipShop)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [XiaoMi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiaoMi)    | 112   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   15.18% |
|  [Weibo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Weibo)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ByteDance)    | 202   | [62](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   30.69% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 688   | [687](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   99.85% |
|  [SohuSogo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SohuSogo)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [CCTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CCTV)    | 42   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.29% |
|  [Xunlei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Xunlei)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [Huawei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Huawei)    | 128   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   21.88% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Tencent)    | 294   | [150](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   51.02% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaMedia)    | 299   | [86](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   28.76% |
|  [NetEase](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEase)    | 118   | [39](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.05% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEaseMusic)    | 28   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   10.71% |
|  [iQIYI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iQIYI)    | 48   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   27.08% |
|  [Douyu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Douyu)    | 10   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [Himalaya](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Himalaya)    | 18   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   27.78% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Alibaba)    | 1222   | [258](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   21.11% |
|  [115](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/115)    | 9   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [12306](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/12306)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [17173](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/17173)    | 57   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   21.05% |
|  [178](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/178)    | 22   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [17zuoye](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/17zuoye)    | 24   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [36kr](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/36kr)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [51Job](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/51Job)    | 19   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   31.58% |
|  [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/56)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [58TongCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/58TongCheng)    | 49   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   44.9% |
|  [ABC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ABC)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [Agora](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Agora)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [AliPay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AliPay)    | 13   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   61.54% |
|  [AnTianKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AnTianKeJi)    | 11   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   27.27% |
|  [Anjuke](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Anjuke)    | 8   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [BOC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BOC)    | 15   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [BOCOM](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BOCOM)    | 6   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [BaiFenDian](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BaiFenDian)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [BaoFengYingYin](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BaoFengYingYin)    | 16   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   18.75% |
|  [BianFeng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BianFeng)    | 100   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   8.0% |
|  [Bootcss](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Bootcss)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [CCB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CCB)    | 13   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   46.15% |
|  [CEB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CEB)    | 15   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   93.33% |
|  [CGB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CGB)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [CIBN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CIBN)    | 71   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   12.68% |
|  [CITIC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CITIC)    | 27   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [CMB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CMB)    | 17   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   11.76% |
|  [CNKI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CNKI)    | 17   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   11.76% |
|  [CSDN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CSDN)    | 15   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   26.67% |
|  [AcFun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AcFun)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [CaiNiao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CaiNiao)    | 9   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   44.44% |
|  [CaiXinChuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CaiXinChuanMei)    | 24   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.83% |
|  [Camera360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Camera360)    | 8   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   37.5% |
|  [ChinaMobile](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaMobile)    | 28   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   53.57% |
|  [ChinaNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaNews)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [ChinaTelecom](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaTelecom)    | 83   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   22.89% |
|  [ChinaUnicom](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaUnicom)    | 24   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   29.17% |
|  [ChuangKeTie](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChuangKeTie)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [ChunYou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChunYou)    | 39   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   64.1% |
|  [DaMai](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DaMai)    | 11   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   18.18% |
|  [DanDanZan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DanDanZan)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Dandanplay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dandanplay)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [DangDang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DangDang)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Dedao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dedao)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [Deepin](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Deepin)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [DiSiFanShi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DiSiFanShi)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [DianCeWangKe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DianCeWangKe)    | 8   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   37.5% |
|  [DingTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DingTalk)    | 11   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   63.64% |
|  [DingXiangYuan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DingXiangYuan)    | 16   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   18.75% |
|  [Domob](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Domob)    | 26   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   11.54% |
|  [DouBan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DouBan)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [EastMoney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/EastMoney)    | 33   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   24.24% |
|  [Eleme](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Eleme)    | 13   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   38.46% |
|  [FeiZhu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/FeiZhu)    | 20   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   55.0% |
|  [FengHuangWang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/FengHuangWang)    | 8   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   62.5% |
|  [FengXiaWangLuo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/FengXiaWangLuo)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [Fiio](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Fiio)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [Funshion](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Funshion)    | 10   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [6JianFang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/6JianFang)    | 19   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.26% |
|  [GaoDe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GaoDe)    | 9   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [HaiNanHangKong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HaiNanHangKong)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [HanYi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HanYi)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [HeMa](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HeMa)    | 12   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [HibyMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HibyMusic)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [HuYa](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HuYa)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [HuaShuTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HuaShuTV)    | 6   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [HuanJu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HuanJu)    | 20   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   45.0% |
|  [HunanTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HunanTV)    | 8   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   62.5% |
|  [Hupu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hupu)    | 12   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [ICBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ICBC)    | 29   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   65.52% |
|  [JiGuangTuiSong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JiGuangTuiSong)    | 17   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   35.29% |
|  [JianGuoYun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JianGuoYun)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [JianShu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JianShu)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [JinJiangWenXue](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JinJiangWenXue)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [JingDong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JingDong)    | 230   | [79](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   34.35% |
|  [JueJin](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JueJin)    | 12   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   8.33% |
|  [Keep](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Keep)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [Kingsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Kingsoft)    | 253   | [46](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   18.18% |
|  [KouDaiShiShang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KouDaiShiShang)    | 22   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   36.36% |
|  [Ku6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Ku6)    | 11   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   45.45% |
|  [KuKeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KuKeMusic)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [KuaiDi100](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KuaiDi100)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [KuaiShou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KuaiShou)    | 94   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.89% |
|  [KuangShi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KuangShi)    | 25   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [KugouKuwo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KugouKuwo)    | 109   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   4.59% |
|  [LanZouYun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LanZouYun)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [LeJu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LeJu)    | 23   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   34.78% |
|  [LeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LeTV)    | 13   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   61.54% |
|  [Lenovo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Lenovo)    | 34   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.71% |
|  [LuDaShi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LuDaShi)    | 17   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   23.53% |
|  [LvMiLianChuang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LvMiLianChuang)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [Maocloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Maocloud)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [MeiTuan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/MeiTuan)    | 7   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   85.71% |
|  [MeiZu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/MeiZu)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Migu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Migu)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [MingLueZhaoHui](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/MingLueZhaoHui)    | 18   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [Mogujie](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Mogujie)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Mojitianqi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Mojitianqi)    | 7   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   71.43% |
|  [OPPO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OPPO)    | 34   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   64.71% |
|  [OnePlus](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OnePlus)    | 7   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   85.71% |
|  [OuPeng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OuPeng)    | 9   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [PPTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PPTV)    | 19   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   26.32% |
|  [PSBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PSBC)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [PingAn](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PingAn)    | 27   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   29.63% |
|  [QiNiuYun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/QiNiuYun)    | 51   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   35.29% |
|  [Qihoo360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Qihoo360)    | 50   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   98.0% |
|  [QingCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/QingCloud)    | 12   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [RuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/RuanMei)    | 22   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   54.55% |
|  [SFExpress](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SFExpress)    | 20   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   45.0% |
|  [SMZDM](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SMZDM)    | 9   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [ShangHaiJuXiao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ShangHaiJuXiao)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [ShenMa](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ShenMa)    | 13   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   30.77% |
|  [Sohu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sohu)    | 53   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   20.75% |
|  [SouFang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SouFang)    | 11   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   36.36% |
|  [SuNing](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SuNing)    | 31   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   19.35% |
|  [SuiShiChuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SuiShiChuanMei)    | 14   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   28.57% |
|  [TCL](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TCL)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.29% |
|  [TaiKang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TaiKang)    | 59   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   6.78% |
|  [TaiheMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TaiheMusic)    | 9   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   44.44% |
|  [Teambition](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Teambition)    | 10   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [TianYaForum](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TianYaForum)    | 13   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   53.85% |
|  [TigerFintech](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TigerFintech)    | 8   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [TongCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TongCheng)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [U17](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/U17)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [UC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/UC)    | 38   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   13.16% |
|  [UCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/UCloud)    | 37   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   21.62% |
|  [UPYun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/UPYun)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   56.25% |
|  [UnionPay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/UnionPay)    | 50   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.0% |
|  [Vancl](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Vancl)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [VideoCrack](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VideoCrack)    | 44   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   11.36% |
|  [Vivo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Vivo)    | 14   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   21.43% |
|  [WanMeiShiJie](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WanMeiShiJie)    | 11   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   27.27% |
|  [WangSuKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WangSuKeJi)    | 189   | [68](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   35.98% |
|  [WangXinKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WangXinKeJi)    | 23   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   17.39% |
|  [WenJuanXing](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WenJuanXing)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [WiFiMaster](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WiFiMaster)    | 62   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   22.58% |
|  [XiamiMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiamiMusic)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [XianYu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XianYu)    | 16   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   31.25% |
|  [XiaoGouKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiaoGouKeJi)    | 23   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   4.35% |
|  [XiaoYuanKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiaoYuanKeJi)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [XieCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XieCheng)    | 29   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   82.76% |
|  [XueErSi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XueErSi)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [XueQiu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XueQiu)    | 11   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   54.55% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YYeTs)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [YiChe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YiChe)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [YiXiaKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YiXiaKeJi)    | 14   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [YiZhiBo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YiZhiBo)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [YouMengChuangXiang](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouMengChuangXiang)    | 21   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   14.29% |
|  [YouZan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouZan)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [YoukuTudou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YoukuTudou)    | 36   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   19.44% |
|  [YuanFuDao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YuanFuDao)    | 86   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   9.3% |
|  [YunFanJiaSu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YunFanJiaSu)    | 31   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   38.71% |
|  [ZDNS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZDNS)    | 12   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [ZhangYue](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhangYue)    | 26   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   30.77% |
|  [ZhiYunZhong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhiYunZhong)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   12.5% |
|  [ZhongGuoShiHua](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhongGuoShiHua)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [ZhongWeiShiJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhongWeiShiJi)    | 17   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   23.53% |
|  [ZhuanZhuan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhuanZhuan)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [iFlytek](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iFlytek)    | 7   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   42.86% |
|  [ifanr](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ifanr)    | 35   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   17.14% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 101   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   7.92% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iCloud)    | 51   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OneDrive)    | 17   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 99   | [30](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   30.3% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 104   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.96% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 26973   | [637](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   2.36% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Advertising)    | 59188   | [1145](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   1.93% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest)    | 76055   | [1167](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   1.53% |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hijacking)    | 219   | [55](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.11% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Privacy)    | 2838   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.04% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Game)    | 64   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   26.56% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Blizzard)    | 38   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   10.53% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Steam)    | 32   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [PlayStation](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PlayStation)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SteamCN)    | 14   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   35.71% |
|  [Xbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Xbox)    | 34   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 28076   | [170](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.61% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 1292   | [38](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   2.94% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 1138   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.18% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 771   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   3.11% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Speedtest)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TikTok)    | 16   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PayPal)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sony)    | 6   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   83.33% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Developer)    | 23   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   4.35% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Scholar)    | 76   | [60](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   78.95% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TeamViewer)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [AsianMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AsianMedia)    | 27   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Lan)    | 26   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   11.54% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的ChinaTest分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的ChinaTest分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Mainland.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/CN.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/direct.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/China/China.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Domestic.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Domestic.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/China.list


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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的ChinaTest分流规则。

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