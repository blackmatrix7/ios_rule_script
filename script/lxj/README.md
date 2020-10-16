# 联享家去广告脚本

## 前言

联享家作为一个具有开锁功能的广告App，不可谓不恶心。

所以编写此脚本，用于去除联享家App的核心功能——广告，保留开锁的附属功能。

去除检查更新、商城内容、特惠内容、资讯内容、我的中的个人服务和社区生活。

## 支持版本

联享家 V5.6.05

更新的版本接口可能会变化导致去广告失效，不建议更新联享家App，除非你喜欢看更多的广告。

## 配置说明

### Surge

```ini
[Rule]
# 联享家去广告
DOMAIN-SUFFIX,bbs.hori-gz.com,REJECT
DOMAIN-SUFFIX,mms.hori-gz.com,REJECT
DOMAIN-SUFFIX,yxhd.hori-gz.com,REJECT
DOMAIN-SUFFIX,ad.hori-gz.com,REJECT
DOMAIN-SUFFIX,adfile.hori-gz.com,REJECT
DOMAIN-SUFFIX,shop17741405.m.youzan.com,REJECT
DOMAIN-SUFFIX,pangolin.snssdk.com,REJECT
DOMAIN-SUFFIX,kinglian.cn,REJECT

[MITM]
hostname = adfile.hori-gz.com, sso.lxjapp.com, nfys.kinglian.cn, bbs.hori-gz.com

[Map Local]
# 联享家禁止检查更新
^https?:\/\/sso\.lxjapp\.com\/\/chims\/servlet\/csGetLatestSoftwareVersionServlet data="https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/blank.json"
```

### Quantumult X

```ini
[filter_local]
DOMAIN-SUFFIX,bbs.hori-gz.com,REJECT
DOMAIN-SUFFIX,mms.hori-gz.com,REJECT
DOMAIN-SUFFIX,yxhd.hori-gz.com,REJECT
DOMAIN-SUFFIX,ad.hori-gz.com,REJECT
DOMAIN-SUFFIX,adfile.hori-gz.com,REJECT
DOMAIN-SUFFIX,shop17741405.m.youzan.com,REJECT
DOMAIN-SUFFIX,pangolin.snssdk.com,REJECT
DOMAIN-SUFFIX,kinglian.cn,REJECT

[rewrite_local]
^https?:\/\/sso\.lxjapp\.com\/\/chims\/servlet\/csGetLatestSoftwareVersionServlet url reject-dict
```

### Loon

```ini
[Remote Rule]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/lxj/lxj_remove_ads_surge.list, policy=REJECT, tag=联享家, enabled=true

[Remote Script]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/lxj/lxj_remove_ads.loon, tag=联享家_屏蔽更新检查, enabled=true
```

