

# Apple Store 库存监控

## 前言

脚本用来监控线下AppleStore指定商品库存，目前验证过iPhone13、AppleWatch7系列。

长话短说，需要做一些准备：

1. 在Apple官网上获取监控的商品
2. 使用BoxJS配置监控的商品型号和地区
3. 手机有足够的流量、电量

## 基础配置

### 确认型号

iPhone13

https://www.apple.com.cn/shop/buy-iphone/iphone-13/MLDH3CH/A

iPhone 13 Pro

https://www.apple.com.cn/shop/buy-iphone/iphone-13-pro/MLTE3CH/A

在上面的链接中选择需要的型号、颜色、容量，然后把地址中类似MLDH3CH/A的文本复制下来，就是需要监控的型号

AppleWatch 

https://www.apple.com.cn/shop/buy-watch/apple-watch/45mm-cellular-graphite-stainless-steel-pride-edition-braided-solo-loop-size-5

AppleWatch因为有选项，所以会稍微麻烦，需要在浏览器的“开发人员工具”中，找到“网络”，在“筛选器”中输入`https://www.apple.com.cn/shop/fulfillment-messages`，找到网络请求，将`parts.0=xxxxx`和`option.0=xxxxxxxxxxx`中xxxxx部分复制出来保存。

将两个拼接在一起，如 `Z0YQ#MKMR3CH/A,MJXA3FE/A`，就是需要监控的型号。

AppleWatch目前没办法自动获取标题，所以可以自定义标题，如`Z0YQ#MKMR3CH/A,MJXA3FE/A#AppleWatch 7 石墨色不锈钢`，把这部分输入到BoxJs的监控型号中。

### 确认地区

省市示例：吉林 长春 朝阳区

直辖市示例：北京 北京 昌平区

## 进阶问题

### 脏数据

每次配置型号和地区，都必须在BoxJS中把`iphone_stock`的值清理掉，避免脏数据导致脚本异常。

### 监控间隔

移动端默认为5秒执行一次，NodeJS默认3秒执行一次。NodeJS可以使用Bark推送到手机，但因为需要再通过Bark服务端转发一次，会有些许延迟。

### 监控多个型号

脚本可以支持同时监控多个型号，但是**强烈不建议在移动端这么操作**。每次查询库存只能查询单个型号，配置多个型号需要进行多次查询，如果查询间隔设置得过小，可能导致上次脚本尚未执行完成，下轮监控又开始进行，造成重复推送。同时对手机的流量和电量都造成额外的消耗。

如果一定要监控多个型号，建议使用Node在服务器上运行，通过Bark推送监控结果。

## 通知说明

第一行

表示的是型号、颜色、容量和数据更新时间。

第二行

表示的本次监控的结果，监控店铺数量、售罄的店铺数量、有库存的店铺数量。最后会有一个实心或空心的圆圈。实心圆代表有库存的店铺，空心圆代表本次监控全部售罄。

余下通知内容

表示的是每家店铺的具体情况，小太阳表示有货，禁止符号表示售罄，紧接着是城市和店铺名称。

点击通知可以跳转到Apple Store APP，如果你有安装的话。

## 配置说明

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/iphone.sgmodule
```

### Loon

使用插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/iphone.lnplugin
```

### Quantumult X

配置文件

```ini
[task_local]
0/5 * 6-23 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/iphone.js, tag=AppleStore_商品库存监控, enabled=true
```

