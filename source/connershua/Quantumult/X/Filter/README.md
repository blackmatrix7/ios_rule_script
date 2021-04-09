在「配置文件」选择「编辑」，在「[filter_remote]」内如下添加文本

```
[filter_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/Unbreak.list, tag=Unbreak, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/Advertising.list, tag=Advertising, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/Hijacking.list, tag=Hijacking, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/ForeignMedia.list, tag=ForeignMedia, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/DomesticMedia.list, tag=DomesticMedia, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/Global.list, tag=Global, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_bot/master/source/connershua/Quantumult/X/Filter/China.list, tag=China, enabled=true
```

若不清楚可看图文教程：[Quantumult X 导入配置及安装证书](https://medium.com/circumvention-technology/import-profile-on-quantumult-x-6dca41b597d8)

更多策略可查阅：https://github.com/ConnersHua/Profiles/tree/master/Quantumult/X/Filter/