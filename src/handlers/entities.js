/*
 * @Author: 一只小菜鸡 y1286780926@163.com
 * @Date: 2023-04-18 15:13:56
 * @LastEditors: 一只小菜鸡 y1286780926@163.com
 * @LastEditTime: 2023-04-21 11:56:33
 * @FilePath: \svgdemo\src\handlers\entities.js
 * @Description: 
 * 
 * Copyright (c) 2023 by bigemap/${git_name_email}, All Rights Reserved. 
 */
import logger from '../util/logger.js'
import point from './entity/point.js'
import line from './entity/line.js'
import lwpolyline from './entity/lwpolyline.js'
import polyline from './entity/polyline.js'
import vertex from './entity/vertex.js'
import circle from './entity/circle.js'
import arc from './entity/arc.js'
import ellipse from './entity/ellipse.js'
import spline from './entity/spline.js'
import solid from './entity/solid.js'
import hatch from './entity/hatch.js'
import mtext from './entity/mtext.js'
import attdef from './entity/attdef.js'
import attrib from './entity/attrib.js'
import insert from './entity/insert.js'
import threeDFace from './entity/threeDFace.js'
import dimension from './entity/dimension.js'
import text from './entity/text.js'
import viewport from './entity/viewport.js'

const handlers = [
  point,
  line,
  lwpolyline,
  polyline,
  vertex,
  circle,
  arc,
  ellipse,
  spline,
  solid,
  hatch,
  mtext,
  attdef,
  attrib,
  text,
  insert,
  dimension,
  threeDFace,
  viewport,
].reduce((acc, mod) => {
  acc[mod.TYPE] = mod
  return acc
}, {})

export default (tuples) => {
  const entities = []
  const entityGroups = []
  let currentEntityTuples

  // First group them together for easy processing
  tuples.forEach((tuple) => {
    const type = tuple[0]
    if (type === 0) {
      currentEntityTuples = []
      entityGroups.push(currentEntityTuples)
    }
    currentEntityTuples.push(tuple)
  })

  let currentPolyline
  entityGroups.forEach((tuples) => {
    const entityType = tuples[0][1]
    const contentTuples = tuples.slice(1)

    if (handlers[entityType] !== undefined) {
      const e = handlers[entityType].process(contentTuples)
      // "POLYLINE" cannot be parsed in isolation, it is followed by
      // N "VERTEX" entities and ended with a "SEQEND" entity.
      // Essentially we convert POLYLINE to LWPOLYLINE - the extra
      // vertex flags are not supported
      if (entityType === 'POLYLINE') {
        currentPolyline = e
        entities.push(e)
      } else if (entityType === 'VERTEX') {
        if (currentPolyline) {
          currentPolyline.vertices.push(e)
        } else {
          logger.error('ignoring invalid VERTEX entity')
        }
      } else if (entityType === 'SEQEND') {
        currentPolyline = undefined
      } else {
        // All other entities
        entities.push(e)
      }
    } else {
      logger.warn('unsupported type in ENTITIES section:', entityType)
    }
  })

  return entities
}
