/*
 * @Author: 一只小菜鸡 y1286780926@163.com
 * @Date: 2023-04-18 15:13:56
 * @LastEditors: 一只小菜鸡 y1286780926@163.com
 * @LastEditTime: 2023-04-21 11:59:36
 * @FilePath: \svgdemo\src\handlers\entity\attrib.js
 * @Description: 
 * 
 * Copyright (c) 2023 by bigemap/${git_name_email}, All Rights Reserved. 
 */
import { assign } from './attdef.js'

export const TYPE = 'ATTRIB'

export const process = (tuples) => {
  return tuples.reduce(
    (entity, tuple) => {
      const type = tuple[0]
      const value = tuple[1]

      assign(entity, type, value)

      return entity
    },
    {
      type: TYPE,
      subclassMarker: 'AcDbText',
      thickness: 0,
      scaleX: 1,
      mtext: {},
      text: {},
    },
  )
}

export default { TYPE, process }
