# ChinaNoMedia

## 前言

本项目的ChinaNoMedia规则由《规则生成器》自动整合与去重。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
从ChinaMax中排除ChinaMedia规则，便于在Quantumult X中与ChinaMedia搭配使用。

## 规则统计

总计规则：17443 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 7092 |
| PROCESS-NAME | 5 |
| DOMAIN | 17 |
| IP-CIDR | 6150 |
| DOMAIN-KEYWORD | 13 |
| IP-CIDR6 | 4166 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

### Clash 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaNoMedia/ChinaNoMedia.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaNoMedia/ChinaNoMedia_Domain.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaNoMedia/ChinaNoMedia_IP.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaNoMedia/ChinaNoMedia_Classical.yaml


稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/ChinaNoMedia/ChinaNoMedia.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/ChinaNoMedia/ChinaNoMedia_Domain.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/ChinaNoMedia/ChinaNoMedia_IP.yaml
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/ChinaNoMedia/ChinaNoMedia_Classical.yaml


如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

ChinaNoMedia.yaml 请使用 behavior: "classical"。

ChinaNoMedia_Classical.yaml 请使用 behavior: "classical"。

ChinaNoMedia_Domain.yaml 请使用 behavior: "domain"。

ChinaNoMedia_IP.yaml 请使用 behavior: "ipcidr"。

ChinaNoMedia_Classical.yaml 可以单独使用，其他规则必须同时使用。

文件名带Resolve，指对于IP-CIDR、IP-CIDR6的规则，不增加no-resolve，其余与上述相同。

#### 最简单的用法

使用 ChinaNoMedia_Classical.yaml。

## 子规则/排除规则

当前分流规则，已包含以下子规则：

- 115

- 12306

- 17173

- 178

- 17zuoye

- 360

- 36kr

- 4399

- 51Job

- 56

- 58TongCheng

- 6JianFang

- 8btc

- ABC

- AcFun

- Agora

- AliPay

- Alibaba

- AnTianKeJi

- Anjuke

- BOC

- BOCOM

- BaiFenDian

- BaiShanYunKeJi

- Baidu

- BaoFengYingYin

- BianFeng

- BiliBili

- Bootcss

- ByteDance

- CAS

- CCB

- CCTV

- CEB

- CGB

- CIBN

- CITIC

- CKJR

- CMB

- CNKI

- CNNIC

- CSDN

- CaiNiao

- CaiXinChuanMei

- Camera360

- ChengTongWangPan

- China

- ChinaIPs

- ChinaIPsBGP

- ChinaMobile

- ChinaNews

- ChinaTelecom

- ChinaUnicom

- ChuangKeTie

- ChunYou

- DaMai

- DanDanZan

- Dandanplay

- DangDang

- Dedao

- Deepin

- DiDi

- DiLianWangLuo

- DiSiFanShi

- DianCeWangKe

- DingTalk

- DingXiangYuan

- Domob

- DouBan

- Douyu

- DuoWan

- EastMoney

- Eleme

- FanFou

- FeiZhu

- FengHuangWang

- FengXiaWangLuo

- Fiio

- Funshion

- GaoDe

- GuiGuDongLi

- HaiNanHangKong

- HanYi

- HeMa

- HibyMusic

- Himalaya

- Hpplay

- HuYa

- HuaShuTV

- HuanJu

- Huawei

- HunanTV

- Hupu

- ICBC

- JiGuangTuiSong

- JianGuoYun

- JianShu

- JinJiangWenXue

- JingDong

- JueJin

- Keep

- KingSmith

- Kingsoft

- KouDaiShiShang

- Ku6

- KuKeMusic

- KuaiDi100

- KuaiShou

- KuangShi

- KugouKuwo

- LanZouYun

- LeJu

- LeTV

- Lenovo

- LianMeng

- LuDaShi

- LvMiLianChuang

- Maocloud

- MeiTu

- MeiTuan

- MeiZu

- MiWu

- Migu

- MingLueZhaoHui

- Mogujie

- Mojitianqi

- NGAA

- NetEase

- NetEaseMusic

- OPPO

- OnePlus

- OuPeng

- PPTV

- PSBC

- Pinduoduo

- PingAn

- QiNiuYun

- QingCloud

- RuanMei

- SFExpress

- SMZDM

- ShangHaiJuXiao

- Shanling

- ShenMa

- ShiNongZhiKe

- Sina

- Sohu

- SouFang

- SuNing

- SuiShiChuanMei

- TCL

- TaiKang

- TaiheMusic

- Teambition

- Tencent

- TencentVideo

- TianTianKanKan

- TianWeiChengXin

- TianYaForum

- TigerFintech

- TongCheng

- U17

- UC

- UCloud

- UPYun

- UnionPay

- Vancl

- VipShop

- Vivo

- WanKaHuanJu

- WanMeiShiJie

- WangSuKeJi

- WangXinKeJi

- WeiZhiYunDong

- Weibo

- WenJuanXing

- WiFiMaster

- XiamiMusic

- XianYu

- XiaoGouKeJi

- XiaoMi

- XiaoYuanKeJi

- XieCheng

- XueErSi

- XueQiu

- Xunlei

- YYeTs

- YiChe

- YiXiaKeJi

- YiZhiBo

- YouMengChuangXiang

- YouZan

- Youku

- YuanFuDao

- YunFanJiaSu

- ZDNS

- ZhangYue

- ZhiYinManKe

- ZhiYunZhong

- ZhongGuoShiHua

- ZhongWeiShiJi

- ZhongYuanYiShang

- ZhuanZhuan

- iFlytek

- iQIYI

- ifanr

除非特殊需求，否则不建议重复引用。

当前分流规则，已排除以下规则：

- ChinaMedia

## 数据来源

本项目的ChinaNoMedia复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的ChinaNoMedia复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/360.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/4399.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Alibaba.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Baidu.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/ByteDance.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/CCTV.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/DiDi.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Douyu.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/HuaWei.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/MI.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Meitu.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/NetEase.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/PDD.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sina.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Tencent.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TencentVideo.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Vip.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Ximalaya.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Xunlei.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Youku.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/ChinaIP.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Podcast/Himalaya.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/bilibili.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/iQIYI.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Mainland.list
- https://raw.githubusercontent.com/Hackl0us/GeoIP2-CN/release/CN-ip-cidr.txt
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/CN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/115.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/12306.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/17173.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/178.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/17zuoye.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/360.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/36kr.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/4399.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/51Job.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/56.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/58TongCheng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/6JianFang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/8btc.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ABC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/AcFun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Agora.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/AliPay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Alibaba.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/AnTianKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Anjuke.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BOC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BOCOM.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BaiDu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BaiFenDian.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BaiShanYunKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BaoFengYingYin.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BianFeng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BiliBili.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Bootcss.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ByteDance.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CAS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CCB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CCTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CEB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CGB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CIBN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CITIC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CKJR.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CMB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CNKI.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CNNIC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CSDN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CaiNiao.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CaiXinChuanMei.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Camera360.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChengTongWangPan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChinaMobile.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChinaNews.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChinaTelecom.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChinaUnicom.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChuangKeTie.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ChunYou.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DaMai.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DanDanZan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Dandanplay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DangDang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Dedao.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Deepin.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DiDi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DiLianWangLuo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DiSiFanShi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DianCeWangKe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DingTalk.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DingXiangYuan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Domob.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DouBan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DouYu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DuoWan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/EastMoney.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Eleme.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/FanFou.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/FeiZhu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/FengHuangWang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/FengXiaWangLuo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Fiio.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Funshion.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/GaoDe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/GuiGuDongLi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HaiNanHangKong.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HanYi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HeMa.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HibyMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HuYa.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HuaShuTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HuaWei.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HuanJu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/HunanTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Hupu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ICBC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JiGuangTuiSong.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JianGuoYun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JianShu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JinJiangWenXue.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JingDong.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/JueJin.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Keep.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KingSmith.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Kingsoft.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KouDaiShiShang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Ku6.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KuKeMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KuaiDi100.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KuaiShou.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/KuangShi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Kugou%26Kuwo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LanZouYun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LeJu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LeTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Lenovo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LianMeng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LuDaShi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LvMiLianChuang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Maocloud.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/MeiTuan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/MeiZu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/MiWu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Migu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/MingLueZhaoHui.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Mogujie.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Mojitianqi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/NGAA.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Netease.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/NeteaseMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/OPPO.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/OnePlus.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/OuPeng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/PPTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/PSBC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/PingAn.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/QiNiuYun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Qihoo360.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/QingCloud.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/RuanMei.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/SF-Express.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/SMZDM.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ShangHaiJuXiao.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Shanling.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ShenMa.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ShiNongZhiKe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Sina.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Sohu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/SouFang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/SuNing.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/SuiShiChuanMei.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TCL.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TaiKang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TaiheMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Teambition.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Tencent.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TianTianKanKan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TianWeiChengXin.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TianYaForum.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TigerFintech.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/TongCheng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/U17.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/UC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/UCloud.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/UPYun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/UnionPay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Vancl.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Vivo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WanKaHuanJu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WanMeiShiJie.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WangSuKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WangXinKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WeiZhiYunDong.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WenJuanXing.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/WiFiMaster.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XiMaLaYa.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XiamiMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XianYu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XiaoGouKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XiaoYuanKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Xiaomi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XieCheng.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XueErSi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XueQiu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YYeTs.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YiChe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YiXiaKeJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YiZhiBo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YouMengChuangXiang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YouZan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/Youku%26Tudou.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YuanFuDao.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/YunFanJiaSu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZDNS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhangYue.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhiYinManKe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhiYunZhong.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhongGuoShiHua.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhongWeiShiJi.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhongYuanYiShang.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ZhuanZhuan.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/hpplay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/iFlytek.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/iQIYI.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/ifanr.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/cncidr.txt
- https://raw.githubusercontent.com/Mazetsz/ACL4SSR/master/Clash/NetEaseCloudMusic.list
- https://raw.githubusercontent.com/O7Y0/Attached/main/UnblockNeteaseMusic/NeteaseCloudMusic.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/ByteDance/ByteDance.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/China/China.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Weibo/Weibo.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Domestic.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Bilibili.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Domestic%20IPs.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Domestic.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Netease%20Music.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Tencent%20Video.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/iQiyi.list
- https://raw.githubusercontent.com/misakaio/chnroutes2/master/chnroutes.txt
- https://raw.githubusercontent.com/nzw9314/QuantumultX/master/NeteaseMusic.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/Bilibili.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/Tencent.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/iQiyi.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/China.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/ChinaIP.list


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。