# tinypng-cli

基于[tinypng](https://tinypng.com/developers)官方提供的api做的压缩图片cli工具

## 用法

`tinypng -k [官方申请的key]` 如果不填key，默认用的是我的key

会在本地寻找所有`png/jpg`文件，压缩后自动生成`optimized`目录并存放其中

**针对公司网络做了代理，这是为什么我要做个这玩意的主要原因**