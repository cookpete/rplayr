import React, { Component } from 'react'

import 'normalize.css/normalize.css'
import classNames from './App.scss'

export default class App extends Component {
  render () {
    return (
      <div className={classNames.app}>
        Hello, world.
      </div>
    )
  }
}
