# ChinaTest

## 前言

本项目的ChinaTest分流规则由爬虫程序自动维护。

定时爬取互联网上开源的ChinaTest分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-10 03:01:06。

## 规则统计

总计规则：72430 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| HOST-SUFFIX | 72370 |
| USER-AGENT | 30 |
| HOST | 11 |
| IP-CIDR | 4 |
| HOST-KEYWORD | 10 |
| IP6-CIDR | 4 |
| GEOIP | 1 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### QuantumultX 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/QuantumultX/ChinaTest/ChinaTest.list

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/WhiteList)    | 20   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   5.0% |
|  [Bilibili](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Bilibili)    | 60   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [DiDi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/DiDi)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Meitu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Meitu)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Pinduoduo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Pinduoduo)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Sina)    | 10   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   90.0% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Baidu)    | 265   | [70](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   26.42% |
|  [360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/360)    | 249   | [66](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   26.51% |
|  [4399](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/4399)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   76.92% |
|  [VipShop](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/VipShop)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [XiaoMi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/XiaoMi)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Weibo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Weibo)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ByteDance)    | 211   | [61](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   28.91% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/China)    | 689   | [653](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   94.78% |
|  [SohuSogo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/SohuSogo)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [CCTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CCTV)    | 42   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   14.29% |
|  [Xunlei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Xunlei)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [Huawei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Huawei)    | 9   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Tencent)    | 19   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaMedia)    | 141   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   34.75% |
|  [NetEase](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/NetEase)    | 25   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   36.0% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/NetEaseMusic)    | 22   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   40.91% |
|  [iQiyi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/iQiyi)    | 16   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   6.25% |
|  [Douyu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Douyu)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Himalaya](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Himalaya)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Alibaba)    | 1222   | [257](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   21.03% |
|  [115](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/115)    | 9   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [12306](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/12306)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   33.33% |
|  [17173](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/17173)    | 57   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   21.05% |
|  [178](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/178)    | 22   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [17zuoye](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/17zuoye)    | 24   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [36kr](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/36kr)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [51Job](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/51Job)    | 19   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   31.58% |
|  [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/56)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [58TongCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/58TongCheng)    | 49   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   44.9% |
|  [ABC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ABC)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [Agora](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Agora)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [AliPay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AliPay)    | 13   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   61.54% |
|  [AnTianKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AnTianKeJi)    | 11   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   27.27% |
|  [Anjuke](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Anjuke)    | 8   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [BOC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BOC)    | 15   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   60.0% |
|  [BOCOM](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BOCOM)    | 6   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [BaiFenDian](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BaiFenDian)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [BaoFengYingYin](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BaoFengYingYin)    | 16   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   18.75% |
|  [BianFeng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BianFeng)    | 100   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   8.0% |
|  [Bootcss](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Bootcss)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [CCB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CCB)    | 13   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   38.46% |
|  [CEB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CEB)    | 15   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   93.33% |
|  [CGB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CGB)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [CIBN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CIBN)    | 71   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   12.68% |
|  [CITIC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CITIC)    | 27   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   55.56% |
|  [CMB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CMB)    | 17   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   11.76% |
|  [CNKI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CNKI)    | 17   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   11.76% |
|  [CSDN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CSDN)    | 15   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   26.67% |
|  [AcFun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AcFun)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [CaiNiao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CaiNiao)    | 9   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   44.44% |
|  [CaiXinChuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/CaiXinChuanMei)    | 24   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   20.83% |
|  [Camera360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Camera360)    | 8   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   37.5% |
|  [ChinaMobile](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaMobile)    | 28   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   53.57% |
|  [ChinaNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaNews)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [ChinaTelecom](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaTelecom)    | 83   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   21.69% |
|  [ChinaUnicom](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaUnicom)    | 24   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   25.0% |
|  [ChuangKeTie](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChuangKeTie)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   20.0% |
|  [ChunYou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChunYou)    | 39   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   64.1% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Apple)    | 102   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   4.9% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/iCloud)    | 51   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   1.96% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/OneDrive)    | 17   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Microsoft)    | 99   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   16.16% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google)    | 111   | [35](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   31.53% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AdvertisingLite)    | 21602   | [651](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   3.01% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Advertising)    | 48176   | [1147](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   2.38% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AdvertisingTest)    | 67910   | [1175](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   1.73% |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Hijacking)    | 219   | [56](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   25.57% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Privacy)    | 2813   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   0.07% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Game)    | 63   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   26.98% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Blizzard)    | 6   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Steam)    | 16   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/SteamCN)    | 14   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   35.71% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Proxy)    | 27940   | [164](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   0.59% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Global)    | 1288   | [34](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   2.64% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/GlobalMedia)    | 1145   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   0.17% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BlackList)    | 770   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   2.86% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Speedtest)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/TikTok)    | 11   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   18.18% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/PayPal)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Sony)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Developer)    | 23   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   4.35% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Scholar)    | 76   | [60](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   78.95% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/TeamViewer)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [AsianMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AsianMedia)    | 27   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   51.85% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Adobe)    | 34   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Lan)    | 24   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaTest/ChinaTest_Repeat.list)   |   12.5% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的ChinaTest分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的ChinaTest分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/China.list
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