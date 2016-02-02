import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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
    if (window.performance) {
      trackTiming('react', 'firstrender', Math.round(window.performance.now()))
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
          <a href={SOURCE_URL} target='_blank'>Source</a>
          {SEPARATOR}
          by <a href={AUTHOR_URL} target='_blank'>CookPete</a>
        </header>
        { this.props.children }
      </div>
    )
  }
}
