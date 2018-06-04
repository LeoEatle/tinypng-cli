#!/usr/bin/env node
const path = require('path')
const tinify = require('tinify')
const shell = require('shelljs')
// const program = require('commander')
const glob = require('glob-all')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))
const config = require('./config.json')

// username: Yitao Liu
// email: liuyitao811@hotmail.com
tinify.key = config.key
tinify.proxy = config.proxy

function optimizeImgs() {
    // 判断输出目录是否存在，不存在则创建
    if (!shell.test('-d', './optimized')) {
        shell.mkdir('./optimized')
    }
    let promiseList = []
    let progress = 0
    // const fileList = shell.find('.').filter(function(file) { return file.match(/\.png|jpg$/); });
    const fileList = glob.sync('*.jpg', '*.png')
    let progressTotal = fileList.length
    fileList.forEach((file, index) => {
        const source = tinify.fromFile(file).toFile(path.join('optimized', file))
        promiseList.push(source)
        source.then((res) => {
            progress += 1
            console.log(chalk.magenta(`压缩进度: ${progress}/${progressTotal}`))
        })
    })
    Promise.all(promiseList).then((res) => {
        console.log(chalk.green('全部压缩成功！:)'))
        shell.exit()
    }).catch((err) => {
        console.log(chalk.red('Ops，压缩失败了'))
    })
}

if (argv.key) tinify.key = program.key

optimizeImgs()
