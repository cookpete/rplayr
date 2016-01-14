// http://dmfrancisco.github.io/react-icons

import React from 'react'

import classNames from './Icon.scss'

export default function Icon ({ icon, className = '', ...extraProps }) {
  return (
    <svg
      {...extraProps}
      className={classNames.icon + ' ' + className}
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid meet'
      fit
    >
      { renderGraphic(icon) }
    </svg>
  )
}

function renderGraphic (icon) {
  switch (icon) {
    case 'play':
      return <g><path d='M8 5v14l11-7z'></path></g>
    case 'pause':
      return <g><path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'></path></g>
    case 'next':
      return <g><path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z'></path></g>
    case 'prev':
      return <g><path d='M6 6h2v12H6zm3.5 6l8.5 6V6z'></path></g>
    case 'volume':
      return <g><path d='M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z'></path></g>
    case 'search':
      return <g><path d='M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z'></path></g>
    case 'clear':
      return <g><path d='M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z'></path></g>
  }
}
