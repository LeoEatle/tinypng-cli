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
if (argv.key) tinify.key = program.key
if (config.proxy) {
    tinify.proxy = config.proxy
}

const DEFAULT_TIME = 5000
let progress = 0
let progressTotal
function optimizeImgs() {
    // 判断输出目录是否存在，不存在则创建
    if (!shell.test('-d', './optimized')) {
        shell.mkdir('./optimized')
    }
    const fileList = glob.sync(['*.jpg', '*.png'])
    progressTotal = fileList.length
    if (progressTotal === 0) {
        console.log(chalk.red('没有找到图片文件！'))
    }
    return fileList
}

async function chainOptimized(fileList) {
  for(let i = 0; i < fileList.length; i++) {
    await tinify.fromFile(fileList[i]).toFile(path.join('optimized', fileList[i]))
    progress += 1
    console.log(chalk.magenta(`压缩进度: ${progress}/${progressTotal}`))
  }
  console.log(chalk.green('全部压缩完成✅'))
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
