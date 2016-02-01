import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import 'normalize.css/normalize.css'
import '../defaults.scss'
import classNames from './App.scss'
import { trackTiming } from '../analytics'

const AUTHOR_URL = 'https://github.com/CookPete'
const SOURCE_URL = 'https://github.com/CookPete/reddit-player'
const DOT = ' · '

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
              RedditPlayer
            </Link>
          </h1>
          {DOT}<a href={SOURCE_URL} target='_blank'>Source</a>
          {DOT} by <a href={AUTHOR_URL} target='_blank'>CookPete</a>
        </header>
        { this.props.children }
      </div>
    )
  }
}
