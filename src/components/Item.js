import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import randomcolor from 'randomcolor'

import classNames from './Item.scss'
import { DEFAULT_POST_TITLE } from '../config'

export default function Item ({ onClick, href, thumbnail, title, meta, active }) {
  const itemClass = active ? classNames.activeItem : classNames.item
  let content = renderContent({ thumbnail, title, meta })
  if (href) {
    content = <Link to={href}>{ content }</Link>
  }
  return (
    <li className={itemClass} onClick={onClick}>
      {content}
    </li>
  )
}

Item.propTypes = {
  onClick: PropTypes.func,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  active: PropTypes.bool,
  meta: PropTypes.node
}

function renderContent ({ thumbnail, title, meta }) {
  const titleClass = title ? classNames.title : classNames.noTitle
  const thumbStyle = {
    backgroundImage: thumbnail ? `url(${thumbnail})` : undefined,
    backgroundColor: randomcolor({ seed: title, luminosity: 'light' })
  }
  title = title || DEFAULT_POST_TITLE
  return [
    <div key='thumb' className={classNames.thumbnail} style={thumbStyle}>
      { !thumbnail ? title.slice(0, 1).toLowerCase() : '' }
    </div>,
    <div key='info' className={classNames.info}>
      <div className={titleClass} title={title}>
        {title}
      </div>
      <div className={classNames.meta} title={typeof meta === 'string' ? meta : undefined}>
        {meta}
      </div>
    </div>
  ]
}
