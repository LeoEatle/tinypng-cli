const path = require('path')
const tinify = require('tinify')
const shell = require('shelljs')
// const program = require('commander')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
// username: Yitao Liu
// email: liuyitao811@hotmail.com
tinify.key = 'ggPk6TH1dKFZ7IRrJccGstGOocJLLyn3'

tinify.proxy = "http://dev-proxy.oa.com:8080";

function optimizeImgs() {
    // 判断输出目录是否存在，不存在则创建
    if (!shell.test('-d', './optimized')) {
        shell.mkdir('./optimized')
    }
    shell.ls(['*.png', '*.jpg']).forEach((file, index) => {
        const source = tinify.fromFile(file).toFile(path.join('optimized', file))
        source.then((res) => {
            console.log(chalk.green('压缩成功'))
            shell.exit()
        })
    })
}

if (argv.key) tinify.key = program.key

optimizeImgs()
