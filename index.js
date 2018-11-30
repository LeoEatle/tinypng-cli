#!/usr/bin/env node
const path = require('path')
const tinify = require('tinify')
const shell = require('shelljs')
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
// get file list
function optimizeImgs() {
    // if directly pass file path
    if (argv._) {
        return argv._
    }
    // if we need to create a new dir
    if (argv.dir && !shell.test('-d', argv.dir)) {
        shell.mkdir(argv.dir)
    }
    // by default, look up the current dir
    const fileList = glob.sync(['*.jpg', '*.png'])
    return fileList
}

async function chainOptimized(fileList) {
    progressTotal = fileList.length
    if (progressTotal === 0) {
        console.log(chalk.red('No image file found! Please confirm jpg/png file in your directory.'))
        shell.exit()
    }
    let prefix = argv.dir || ''
    for(let i = 0; i < fileList.length; i++) {
        await tinify.fromFile(fileList[i]).toFile(path.join(prefix, fileList[i]))
        progress += 1
        console.log(chalk.magenta(`progress: ${progress}/${progressTotal}`))
    }
    console.log(chalk.green('All images are compressed! ✅'))
    shell.exit()
}


tinify.validate(function(err) {
    if (err) throw err;
    var compressionsThisMonth = tinify.compressionCount;
    console.log(chalk.green(`Your total usage this month: ${compressionsThisMonth}/500`))
    // Validation of API key failed.
  })
  
const fileList = optimizeImgs()
try {
    chainOptimized(fileList)
} catch (err) {
    throw err
}
