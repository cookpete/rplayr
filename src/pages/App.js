import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import randomcolor from 'randomcolor'

import 'normalize.css/normalize.css'
import '../styles/defaults.scss'
import classNames from './App.scss'
import { trackTiming } from '../analytics'
import { APP_NAME, AUTHOR_URL, SOURCE_URL, SEPARATOR } from '../config'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  componentDidMount () {
    const { params, location } = this.props
    this.updateFavicon(params, location)
    if (window.performance) {
      trackTiming('react', 'firstrender', Math.round(window.performance.now()))
    }
  }
  componentWillReceiveProps ({ params, location }) {
    this.updateFavicon(params, location.pathname)
  }
  updateFavicon (params, pathname) {
    const seed = params.post_id || params.subreddit || params.multi || pathname
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(16, 16, 16, 0, 360)
      ctx.fillStyle = randomcolor({ seed, luminosity: 'light' })
      ctx.fill()
      const url = canvas.toDataURL('image/png')
      document.querySelector('link[rel="icon"]').setAttribute('href', url)
    }
  }
  render () {
    return (
      <div className={classNames.app}>
        <header className={classNames.header}>
          <h1 className={classNames.title}>
            <Link to='/'>
              {APP_NAME}
            </Link>
          </h1>
          {SEPARATOR}
          by <a href={AUTHOR_URL} target='_blank'>CookPete</a>
          {SEPARATOR}
          <a href={SOURCE_URL} target='_blank'>Source</a>
        </header>
        {this.props.children}
      </div>
    )
  }
}
