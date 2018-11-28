#!/usr/bin/env node
const path = require('path')
const tinify = require('tinify')
const shell = require('shelljs')
// const program = require('commander')
const glob = require('glob-all')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
const config = require('./config.json')
tinify.key = config.key
if (argv.key) tinify.key = argv.key
if (config.proxy || argv.proxy) {
    const proxy = argv.proxy || config.proxy
    tinify.proxy = proxy
    console.log(chalk.green('proxy set done proxy:' + proxy))
}

const DEFAULT_TIME = 5000
let progress = 0
let progressTotal
function optimizeImgs() {
    // 判断输出目录是否存在，不存在则创建
    if (argv.dir && !shell.test('-d', argv.dir)) {
        shell.mkdir(argv.dir)
    }
    const fileList = glob.sync(['*.jpg', '*.png'])
    progressTotal = fileList.length
    if (progressTotal === 0) {
        console.log(chalk.red('没有找到图片文件！'))
    }
    return fileList
}

async function chainOptimized(fileList) {
    let prefix = argv.dir || ''
    for(let i = 0; i < fileList.length; i++) {
        await tinify.fromFile(fileList[i]).toFile(path.join(prefix, fileList[i]))
        progress += 1
        console.log(chalk.magenta(`压缩进度: ${progress}/${progressTotal}`))
    }
    console.log(chalk.green('全部压缩完成✅'))
    shell.exit()
}


tinify.validate(function(err) {
    if (err) throw err;
    var compressionsThisMonth = tinify.compressionCount;
    // 默认每个账户每个月500额度
    console.log(chalk.green(`当月可用余额为${500 - compressionsThisMonth}`))
    // Validation of API key failed.
  })
  
const fileList = optimizeImgs()
try {
    chainOptimized(fileList)
} catch (err) {
    throw err
}
