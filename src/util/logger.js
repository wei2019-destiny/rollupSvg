/*
 * @Author: 一只小菜鸡 y1286780926@163.com
 * @Date: 2023-04-18 15:13:56
 * @LastEditors: 一只小菜鸡 y1286780926@163.com
 * @LastEditTime: 2023-04-21 11:57:22
 * @FilePath: \svgdemo\src\util\logger.js
 * @Description: 
 * 
 * Copyright (c) 2023 by bigemap/${git_name_email}, All Rights Reserved. 
 */
import config from '../config.js'

function info() {
  if (config.verbose) {
    console.info.apply(undefined, arguments)
  }
}

function warn() {
  if (config.verbose) {
    console.warn.apply(undefined, arguments)
  }
}

function error() {
  console.error.apply(undefined, arguments)
}

export default {
  info,
  warn,
  error,
}
