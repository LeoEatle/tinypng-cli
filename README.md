# tinypng-cli

A convenient tool to compile imgs via tinypng api.

## Usage

```
tnpm install -g @tencent/tinypng-cli
cd <img-dir>
tinypng
```
By default, it will compress all the image files in your current directory.

<img src="https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/Jietu20181119-215155@2x.jpg" width="360" >

❤️It works like charm.

You can also pass the file path to it like this:

`tinypng <img-path>`

You can also pass multiple file paths to it like this:

`tinypng <img1-path> <img2-path> ...`

## API

### --dir
The output path. If no param, it will replace original images as default behavior. 

`tinypng --dir <dir-name>`

### -key
The key to use tinypng api. The default key is my key. (NOT RECOMMAND)

`tinypng --key <key>`

### -proxy
Proxy. May be useful in company network.

`tinypng --proxy <hostname>`

## Compatibility

Use `async/await` to implement chaining network request. 

No babel used. So it is only supported in Node 8+. 

PR welcomed!