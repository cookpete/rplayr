import React, { Component, PropTypes } from 'react'
import { getPosts } from 'fetch-reddit'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

import classNames from './Playlist.scss'
import Player from './Player'
import Button from './Button'
import Post, { DEFAULT_TITLE } from './Post'
import { trackPlaylistEvent } from '../analytics'

const IGNORE_AUTHORS = ['Mentioned_Videos', 'PlaylisterBot']

export default class Playlist extends Component {
  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object
  };
  state = {
    posts: {},
    loadMore: null,
    activePost: null
  };
  componentDidMount () {
    const { pathname, query } = this.props.location
    getPosts(pathname, query).then(::this.processPosts)
  }
  componentWillReceiveProps (nextProps) {
    if (!this.getPosts(nextProps)) {
      const { pathname, query } = nextProps.location
      getPosts(pathname, query).then(::this.processPosts)
    }
  }
  processPosts ({ posts, loadMore }) {
    const { pathname, search } = this.props.location
    const currentPosts = this.getPosts()
    posts = posts.filter(::this.filterPost)
    if (currentPosts) {
      posts = currentPosts.concat(posts)
    }
    this.setState({
      posts: Object.assign(this.state.posts, {
        [pathname + search]: posts
      }),
      loadMore: () => {
        loadMore().then(::this.processPosts)
        this.setState({ loadMore: null })
        trackPlaylistEvent('more', posts.length)
      }
    })
  };
  filterPost (post) {
    return ReactPlayer.canPlay(post.url) && IGNORE_AUTHORS.indexOf(post.author) === -1
  }
  getPosts (props = this.props) {
    const { pathname, search } = props.location
    const { posts } = this.state
    return posts[pathname + search]
  }
  playPost = post => {
    document.title = (post.title || DEFAULT_TITLE) + ' · redditplayer'
    this.setState({
      activePost: post
    })
    trackPlaylistEvent('load', post.url)
  };
  skip = (delta = +1) => {
    const posts = this.getPosts()
    const { activePost } = this.state
    const index = posts.findIndex(post => post.id === activePost.id)
    const post = posts[index + delta] || posts[0]
    this.playPost(post)
  };
  renderPosts (posts) {
    if (!posts) {
      return 'Loading…'
    }
    if (posts.length === 0) {
      return 'No playable media found.'
    }
    return (
      <ul className={classNames.playlist}>
        { posts.map(this.renderPost) }
      </ul>
    )
  }
  renderPost = post => {
    const { activePost } = this.state
    return (
      <Post
        key={post.id}
        post={post}
        onPlay={this.playPost}
        playing={activePost ? activePost.id === post.id : false}
        showSubreddit
      />
    )
  };
  renderSortLinks () {
    const { subreddit, multi, username, post_id } = this.props.params
    if (subreddit && !post_id || multi) {
      const { pathname, search } = this.props.location
      const path = subreddit ? `/r/${subreddit}` : `/user/${username}/m/${multi}`
      return (
        <ul className={classNames.sort}>
          <li><a href={'https://www.reddit.com' + pathname + search} target='_blank'>playlist source</a></li>
          <li>·</li>
          <li><Link to={path}>hot</Link></li>
          <li><Link to={path + '/new'}>new</Link></li>
          <li>top</li>
          { ['all', 'year', 'month', 'day'].map(sort => {
            return (
              <li key={sort}>
                <Link to={{ pathname: `${path}/top`, query: { sort: 'top', t: sort } }}>
                  { sort }
                </Link>
              </li>
            )
          }) }
        </ul>
      )
    }
    return null
  }
  render () {
    const { loadMore, activePost } = this.state
    const posts = this.getPosts()
    return (
      <div>
        <Player activePost={activePost} onSkip={this.skip} />
        { this.renderSortLinks() }
        { this.renderPosts(posts) }
        { posts &&
          <Button disabled={!loadMore} onClick={loadMore}>
            Load more
          </Button>
        }
      </div>
    )
  }
}
