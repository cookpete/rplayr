import React, { Component } from 'react'

import Item from '../components/Item'
import Button from '../components/Button'
import { fetchJSON, pluralize } from '../utils'

const SEARCH_URL = 'https://www.reddit.com/r/AskReddit/search.json'
const SEARCH_QUERY = {
  q: 'song',
  sort: 'top',
  t: 'all',
  restrict_sr: 'on',
  limit: 25
}

export default class TopThreads extends Component {
  state = {
    threads: null,
    limit: 5
  };
  componentDidMount () {
    fetchJSON(SEARCH_URL, SEARCH_QUERY, this.processData)
      .then((threads) => this.setState({ threads }))
  }
  processData (response) {
    return response.data.children.filter((thread) => {
      return (
        thread.data.title.indexOf(SEARCH_QUERY.q) !== -1 &&
        thread.data.title.indexOf('Greg') === -1 // Remove the "Greg" thread..
      )
    }).map((thread) => {
      const { id, title, url, num_comments } = thread.data
      return {
        id,
        title,
        num_comments,
        url: url.replace('https://www.reddit.com', '')
      }
    })
  }
  renderLink ({ id, url, title, num_comments }) {
    return (
      <Item
        key={id}
        href={url}
        title={title}
        meta={pluralize(num_comments, 'comment')}
      />
    )
  }
  render () {
    const { threads, limit } = this.state
    return (
      <section>
        {threads && threads.slice(0, limit).map(this.renderLink)}
        {threads && threads.length > limit &&
          <Button onClick={() => this.setState({ limit: limit + 5 })}>
            Show more
          </Button>
        }
      </section>
    )
  }
}
