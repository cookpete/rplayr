import React, { Component, PropTypes } from 'react'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'

import Item from './Item'
import { pluralize, isNumber, decode } from '../utils'
import { SEPARATOR } from '../config'

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    onPlay: PropTypes.func,
    playing: PropTypes.bool,
    showSubreddit: PropTypes.bool
  };
  shouldComponentUpdate (nextProps) {
    return (
      this.props.post.id !== nextProps.post.id ||
      this.props.playing !== nextProps.playing
    )
  }
  onPlay = () => this.props.onPlay(this.props.post);
  onLinkClick (e) {
    // Prevent playing media on link click
    e.stopPropagation()
  }
  renderTime ({ created }) {
    return (
      <TimeAgo
        key='time'
        date={created}
        component='time'
        dateTime={created.toISOString()}
        title={created.toString()}
      />
    )
  }
  renderComments ({ permalink, num_comments, author }) {
    return (
      <a key='comments' onClick={this.onLinkClick} href={permalink} target='_blank' title='View source on Reddit'>
        {isNumber(num_comments) ? pluralize(num_comments, 'comment') : author}
      </a>
    )
  }
  renderSubreddit ({ subreddit }) {
    return (
      <Link key='subreddit' onClick={this.onLinkClick} to={'/r/' + subreddit} title='View source on Reddit'>
        {subreddit}
      </Link>
    )
  }
  renderMeta (post) {
    let nodes = [ this.renderTime(post), SEPARATOR, this.renderComments(post) ]
    if (this.props.showSubreddit) {
      nodes = nodes.concat(SEPARATOR, this.renderSubreddit(post))
    }
    return nodes
  }
  render () {
    const { post, playing } = this.props
    return (
      <Item
        onClick={this.onPlay}
        thumbnail={post.thumbnail}
        title={decode(post.title)}
        meta={this.renderMeta(post)}
        active={playing}
      />
    )
  }
}
