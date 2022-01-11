# 境外网站/IP合集

## 前言

本项目的境外网站/IP合集规则由《规则生成器》自动整合与去重。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
包含所有的Proxy、Global等分组的规则，指已收集的在国外(和国内)有提供服务的网站/IP的合集。

注意！可能会含有大量可以直接访问或国内的网站/IP。

目前把所有的China类型规则进行了排除，但是并不能确保国内所有的网站和服务都已被移除。例如包含McDonalds的子规则，可能会将麦当劳中国的域名mcdonalds.com.cn包括进去。

排除Advertising规则，便于和去广告规则搭配使用。

实验性规则，效果待观察，请谨慎评估后使用。

## MITM
境外网站/IP合集分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要使用MITM才能生效。

程序已根据正则推导一份MITM的模块/复写/插件在当前目录中，推导结果可能存在冗余、遗漏或错误，仅供参考。

## 规则统计

总计规则：37483 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 36085 |
| USER-AGENT | 78 |
| DOMAIN | 30 |
| IP-CIDR | 1188 |
| IP-CIDR6 | 31 |
| PROCESS-NAME | 56 |
| DOMAIN-KEYWORD | 6 |
| URL-REGEX | 9 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GlobalMax/GlobalMax.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GlobalMax/GlobalMax_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/GlobalMax/GlobalMax.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/GlobalMax/GlobalMax_Domain.list



如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

GlobalMax.list 请使用RULE-SET。

GlobalMax_Domain.list 请使用DOMAIN-SET。

两者必须同时使用。

## 子规则/排除规则

当前分流规则，已包含以下子规则：

- 9News

- 9to5

- AFP

- AOL

- ATTWatchTV

- AbemaTV

- Acer

- Adidas

- Adobe

- Akamai

- All4

- Amazon

- AmazonPrimeVideo

- Americasvoice

- Apkpure

- AppleDaily

- AsianMedia

- Atlassian

- AvMoo

- BBC

- BMW

- Bahamut

- Bestbuy

- Bloomberg

- Blued

- BoXun

- BrightCove

- Buypass

- CBS

- CHT

- CNN

- CWSeed

- CableTV

- Canon

- Cisco

- Cloudflare

- Clubhouse

- ClubhouseIP

- Comodo

- Cryptocurrency

- DAZN

- DMM

- Dailymail

- Dailymotion

- Deezer

- Dell

- DigiCert

- Discord

- DiscoveryPlus

- Disney

- Disqus

- Docker

- Dood

- Download

- Dropbox

- DtDNS

- Dubox

- Duckduckgo

- DynDNS

- Dynu

- EHGallery

- Embl

- Emojipedia

- EncoreTVB

- Espn

- FOXNOW

- FOXPlus

- Facebook

- FlipBoard

- Fox

- FuboTV

- Gettyimages

- Gigabyte

- GitBook

- GitLab

- Global

- GlobalLite

- GlobalMedia

- GlobalSign

- Gucci

- HBO

- HBOAsia

- HBOHK

- HBOUSA

- HKBN

- HKedcity

- HP

- HWTV

- HashiCorp

- Heroku

- Huffpost

- Hulu

- HuluJP

- HuluUSA

- IBM

- IMDB

- ITV

- Identrust

- Imgur

- Instagram

- Intel

- Intercom

- JOOX

- Japonx

- Jetbrains

- Jfrog

- Jquery

- Jsdelivr

- Jwplayer

- KKBOX

- KKTV

- KakaoTalk

- Kantv

- LG

- LastFM

- LastPass

- LiTV

- Limelight

- Line

- LineTV

- LivePerson

- Logitech

- LondonReal

- MEGA

- MOMOShop

- MOOV

- Mail

- Mailru

- Manorama

- McDonalds

- MeWatch

- Mozilla

- My5

- NBC

- NYPost

- NYTimes

- Naver

- NaverTV

- Netflix

- Niconico

- Nike

- Nikkei

- Notion

- NowE

- Nvidia

- Opera

- Oreilly

- Overcast

- PBS

- PCCW

- PChomeTW

- Pandora

- PandoraTV

- ParamountPlus

- PayPal

- Peacock

- Picsee

- Pinterest

- Pixiv

- Pixnet

- PlayStation4Upgrade

- Porn

- Pornhub

- PotatoChat

- PrimeVideo

- PrivateTracker

- Protonmail

- Proxy

- ProxyLite

- Python

- Qobuz

- Qualcomm

- RTHK

- Rakuten

- Rarbg

- Razer

- Reddit

- Samsung

- Scaleflex

- Scholar

- Sectigo

- Shopee

- Shopify

- SkyGO

- Slack

- Sling

- SmarTone

- Snap

- Sony

- SoundCloud

- SourceForge

- Spark

- Speedtest

- Spotify

- Stackexchange

- Starbucks

- SublimeText

- Synology

- TIDAL

- TVB

- TVer

- TaiWanGood

- TeamViewer

- Telegram

- TelegramNL

- TelegramSG

- TelegramUS

- Tesla

- ThomsonReuters

- TikTok

- Tumblr

- Twitch

- Twitter

- Unity

- VISA

- VK

- VOA

- Vercel

- Verisign

- Verizon

- VidolTV

- Viki

- Vimeo

- ViuTV

- Voxmedia

- WIX

- WeTV

- Westerndigital

- Whatsapp

- Wikimedia

- Wikipedia

- Wordpress

- Yandex

- Zee

- ZeeTV

- Zendesk

- Zoho

- eBay

- friDay

- iTalkBB

- myTVSUPER

除非特殊需求，否则不建议重复引用。

当前分流规则，已排除以下规则：

- Advertising

- AdvertisingLite

- AdvertisingMiTV

- AdvertisingTest

- ChinaMax

## 数据来源

本项目的境外网站/IP合集复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的境外网站/IP合集复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Adobe.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Amazon.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BBC.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Discord.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Dubox.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Niconico.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Porn.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Pornhub.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/PrivateTracker.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Scholar.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sony.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Spark.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Spotify.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TeamViewer.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Telegram.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TikTok.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Whatsapp.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wikipedia.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Cloudflare.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Mail.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Media/Netflix.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Media/Spotify.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Media/TikTok.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/PayPal.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Telegram.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Clubhouse.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Cryptocurrency.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Game/Discord.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/PayPal.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Scholar.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Telegram/Telegram.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Telegram/TelegramNL.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Telegram/TelegramSG.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Telegram/TelegramUS.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Twitter.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Live/Twitch.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/Deezer.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/Instagram.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/JOOX.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/KKBOX.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/Pandora.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/SoundCloud.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/Spotify.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Music/TIDAL.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Podcast/Overcast.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Streaming.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/StreamingSE.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/%E2%80%8EDiscoveryPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/AbemaTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/All-4.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/BBC-iPlayer.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Bahamut.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/DAZN.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/DMM.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/DisneyPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/FOX-NOW.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/FOXPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/HBO-Asia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/HBO-GO-HKG.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/HBO.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/HWTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Hulu-JPN.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Hulu.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/ITV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/KKTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/LINE-TV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/LiTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/My5.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Naver-TV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Netflix.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Now-E.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/PBS.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/ParamountPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Peacock.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Pornhub.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/Prime-Video.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/TVer.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/TaiwanGood.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/TikTok.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/ViuTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/WeTV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/encoreTVB.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/myTV-SUPER.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/niconico.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/GMedia.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Optional/Netflix.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Optional/PayPal.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Optional/Spotify.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Optional/Telegram.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Outside.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Speedtest.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/App/social/Telegram.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/App/social/WhatsApp.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/App/tools/LastPass.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/foreign.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/AFP.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/ATTWatchTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/AbemaTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/All4.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/AmazonPrimeVideo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Americasvoice.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/AppleDaily.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/BBC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Bahamut.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/BoXun.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/CBS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/CNN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/CWSeed.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/CableTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/DAZN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Dailymotion.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Deezer.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/DiscoveryPlus.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Disney.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/EHGallery.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/EncoreTVB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Fox.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/FuboTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/HBO.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/HWTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Huffpost.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Hulu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/ITV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/JOOX.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Japonx.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/KKBOX.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Kakao.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Kantv.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/LiTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/LineTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/LondonReal.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/MOOV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/MeWatch.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/My5.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/NBC.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/NYPost.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/NYTimes.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/NaverTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Netflix.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Niconico.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Nikkei.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/PBS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Pandora.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/PandoraTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Pornhub.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Qobuz.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/RTHK.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/SkyGO.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Sony.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/SoundCloud.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Spotify.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/TIDAL.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/TVB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/TVER.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/TaiWanGood.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/TikTok.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/VOA.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/VidolTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Viki.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Vimeo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/ViuTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/Voxmedia.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/WeTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/ZeeTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/friDay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Global-Services/iTalkBB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/9News.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/9to5.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/AOL.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Acer.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Adidas.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Adobe.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Akamai.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Amazon.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Apkpure.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Atlassian.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/AvMoo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/BMW.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Bestbuy.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Bloomberg.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Blued.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/BrightCove.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Buypass.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/CHT.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Canon.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Cisco.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Cloudflare.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Comodo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/DMM.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dailymail.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dell.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/DigiCert.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Discord.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Disqus.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Docker.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dood.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dropbox.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/DtDNS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dubox.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Duckduckgo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/DynDNS.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Dynu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Embl.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Emojipedia.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Espn.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Facebook.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/FlipBoard.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Gettyimages.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Gigabyte.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Gitbook.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Gitlab.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Globalsign.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Gucci.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/HKBN.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/HKedcity.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/HP.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/HashiCorp.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Heroku.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/IBM.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/IMDB.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Identrust.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Imgur.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Intel.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Intercom.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Jetbrains.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Jfrog.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Jquery.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Jsdelivr.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Jwplayer.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/LG.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/LastFM.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Limelight.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/LivePerson.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Logitech.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/MEGA.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Mailru.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Manorama.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/McDonalds.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Mozilla.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Naver.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Nike.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Notion.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Nvidia.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Opera.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Oreilly.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/PCCW.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/PChome.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/PayPal.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Picsee.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Pinterest.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Pixiv.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Pixnet.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Protonmail.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Python.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Qualcomm.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Rakuten.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Rarbg.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Razer.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Reddit.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Samsung.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Scaleflex.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Scholar.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Sectigo.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Shopee.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Shopify.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Slack.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Sling.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/SmarTone.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Snap.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Sony.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/SourceForge.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Stackexchange.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Starbucks.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/SublimeText.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Telegram.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Tesla.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/ThomsonReuters.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Tumblr.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Twitch.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Twitter.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Unity.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/VISA.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/VK.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Vercel.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Verisign.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Verizon.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/WIX.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Westerndigital.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Wikimedia.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Wordpress.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Yandex.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Zee.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Zendesk.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Zoho.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/eBay.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/momoshop.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/proxy.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/telegramcidr.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/proxy.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/telegramcidr.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Download.list
- https://raw.githubusercontent.com/Semporia/Quantumult-X/master/Filter/TikTok.list
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Ruleset/Loon/Clubhouse-ip.list
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Ruleset/Loon/Clubhouse.list
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Ruleset/Quantumult%20X/Clubhouse-ip.list
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Ruleset/Quantumult%20X/Clubhouse.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/connershua/Quantumult/X/Filter/ForeignMedia.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AsianMedia/AsianMedia.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Facebook/Facebook.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Synology/Synology.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Twitter/Twitter.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/AsianMedia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/AppleGlobal.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Bahamut.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Cloudflare.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/DisneyPlus.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Netflix.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/PayPal.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Pornhub.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Speedtest.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Telegram.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Spotify.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/PayPal.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Speedtest.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Telegram.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Foreign/Pornhub.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/ForeignMedia.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/ForeignMedia_New.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/Global.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/Amazon.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/Cloudflare.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/Paypal.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/Facebook.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/KakaoTalk.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/Line.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/PotatoChat.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/Telegram.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/Twitter.list
- https://raw.githubusercontent.com/tengyuankoo/qx/main/Clubhouse.list
- https://raw.githubusercontent.com/tengyuankoo/qx/main/Clubhouse_IP.list


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。