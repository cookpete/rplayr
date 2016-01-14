import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import App from './pages/App'
import Home from './pages/Home'
import Playlist from './components/Playlist'

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='r/:subreddit' component={Playlist}>
        <Route path='comments/:post_id/:post_slug(/:comment_id)' />
        <Route path=':sort' />
      </Route>
      <Route path='user/:username' component={Playlist}>
        <Route path='m/:multi(/:sort)' />
        <Route path=':filter' />
      </Route>
    </Route>
    <Redirect from='/u/:username(/**)' to='/user/:username(/**)' />
  </Router>
), document.getElementById('app'))
