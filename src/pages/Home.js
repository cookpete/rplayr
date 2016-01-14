import React, { Component } from 'react'

import classNames from './Home.scss'
import playlists from '../../data/playlists.json'
import About from './About'
import TopThreads from '../components/TopThreads'
import Item from '../components/Item'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { pluralize } from '../utils'

const CURATION_LINK = 'https://www.reddit.com/r/listentothis/comments/1iwc8n/meta_announcing_the_official_rlistentothis_music/'

export default class Home extends Component {

  state = {
    limitSubs: 15,
    limitGenres: 10,
    searchTerm: ''
  };

  onChangeSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  };

  filterSubreddit = ({ name }) => {
    const { searchTerm } = this.state
    if (searchTerm.length > 1) {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    }
    return true
  };

  renderMulti ({ path, name, description }) {
    return (
      <Item
        key={path}
        href={path}
        title={name}
        meta={description}
      />
    )
  }

  renderSubreddit ({ name, subscribers }) {
    return (
      <Item
        key={name}
        href={'/r/' + name}
        title={name}
        meta={pluralize(subscribers, 'subscriber')}
      />
    )
  }

  renderSearch (searchTerm) {
    return (
      <section className={classNames.search}>
        <Icon icon='search' className={classNames.searchIcon} />
        <input
          type='text'
          value={searchTerm}
          onChange={this.onChangeSearch}
          placeholder='search'
        />
        { searchTerm &&
          <button onClick={() => this.setState({ searchTerm: '' })} className={classNames.clearSearch}>
            <Icon icon='clear' />
          </button>
        }
      </section>
    )
  }

  render () {
    const { limitSubs, limitGenres, searchTerm } = this.state
    const subreddits = playlists.subreddits.filter(this.filterSubreddit)
    return (
      <section>
        <h2>Discover</h2>
        <p>Great playlists to discover new music, curated by the mighty <a href={CURATION_LINK}>/u/evilnight</a></p>
        { playlists.discover.map(this.renderMulti) }

        <h2>Genres</h2>
        <p>Multi-subreddits for a variety of styles, curated by the mighty <a href={CURATION_LINK}>/u/evilnight</a></p>
        <ul className={classNames.genres}>
          { playlists.genres.slice(0, limitGenres).map(this.renderMulti) }
        </ul>
        { playlists.genres.length > limitGenres &&
          <Button onClick={() => this.setState({ limitGenres: playlists.genres.length })}>
            Show all
          </Button>
        }

        <h2>Subreddits</h2>
        { this.renderSearch(searchTerm) }
        <ul className={classNames.subreddits}>
          { subreddits
              .slice(0, limitSubs)
              .map(this.renderSubreddit)
          }
          { subreddits.length === 0 &&
            <li>no subreddits found</li>
          }
        </ul>
        { subreddits.length > limitSubs &&
          <Button onClick={() => this.setState({ limitSubs: limitSubs + 15 })}>
            Show more
          </Button>
        }

        <h2>Threads</h2>
        <p>RedditPlayer also supports comment threads. Here are some popular song-related threads from AskReddit:</p>
        <TopThreads />
        <About />
      </section>
    )
  }
}
