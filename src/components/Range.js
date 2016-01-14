import React from 'react'
import { isNumber } from '../utils'

import classNames from './Range.scss'

const THUMB_WIDTH = 10

export default function Range ({
  className = '',
  primary,
  secondary,
  onSeekStart = function () {},
  onSeekChange = function () {},
  onSeekEnd = function () {}
}) {
  return (
    <div className={classNames.wrapper + ' ' + className}>
      <div className={classNames.background} />
      { isNumber(secondary) &&
        <div className={classNames.secondary} style={{ width: `calc(${secondary * 100}% - ${secondary * THUMB_WIDTH}px)` }} />
      }
      <div className={classNames.primary} style={{ width: `calc(${primary * 100}% - ${primary * THUMB_WIDTH}px)` }} />
      <input
        className={classNames.input}
        type='range' min={0} max={1} step='any'
        value={primary}
        onMouseDown={e => onSeekStart(getValue(e))}
        onChange={e => onSeekChange(getValue(e))}
        onMouseUp={e => onSeekEnd(getValue(e))}
      />
    </div>
  )
}

function getValue (e) {
  return parseFloat(e.target.value)
}
