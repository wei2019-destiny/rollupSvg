/*
 * @Author: 一只小菜鸡 y1286780926@163.com
 * @Date: 2023-04-21 14:14:47
 * @LastEditors: 一只小菜鸡 y1286780926@163.com
 * @LastEditTime: 2023-04-23 11:03:58
 * @FilePath: \rollupSvg\rollup.config.mjs
 * @Description: 
 * 
 * Copyright (c) 2023 by bigemap/${git_name_email}, All Rights Reserved. 
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/dxf.js',
    name: 'dxf',
    format: 'umd'
  },
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  },
  plugins: [resolve(), commonjs({
    'namedExports': {
      './lib/main.js': ['__moduleExports']
    }
  }), json()]
};