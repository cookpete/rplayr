import React from 'react'

import { APP_NAME, SOURCE_URL } from '../config'

const REACT_URL = 'https://github.com/facebook/react'
const FETCH_REDDIT_URL = 'https://github.com/CookPete/fetch-reddit'
const REACT_PLAYER_URL = 'https://github.com/CookPete/react-player'
const CURATION_URL = 'https://www.reddit.com/r/listentothis/comments/1iwc8n/meta_announcing_the_official_rlistentothis_music/'
const LISTENTOTHIS_URL = 'https://www.reddit.com/r/listentothis'

export default function About () {
  return (
    <section>
      <h2>FAQ</h2>
      <dl>
        <dt>What is this?</dt>
        <dd>
          {APP_NAME} creates playlists from any Reddit comment thread, subreddit or multi-reddit. Just replace <strong>reddit.com</strong> in any Reddit URL to <strong>{window.location.host}</strong> and you’re good.
        </dd>
        <dt>How does it work?</dt>
        <dd>
          The app is written using <a href={REACT_URL}>React</a>. It fetches stuff from Reddit using <a href={FETCH_REDDIT_URL}>fetch-reddit</a>, then <a href={REACT_PLAYER_URL}>react-player</a> plays any supported URLs. See the <a href={SOURCE_URL}>source code</a> on GitHub. Playlists are curated by the mighty <a href={CURATION_URL}>u/evilnight</a> over at <a href={LISTENTOTHIS_URL}>r/listentothis</a>.
        </dd>
        <dt>What can it play?</dt>
        <dd>
          {APP_NAME} currently supports YouTube, SoundCloud and Vimeo links.
        </dd>
        <dt>What about <a href='http://radd.it'>radd.it</a>, <a href='https://reddit.musicplayer.io'>reddit.musicplayer.io</a>, <a href='http://redditplaylister.phoenixforgotten.com'>redditplaylister</a>, etc?</dt>
        <dd>
          Yes, there are other apps that do the job. I wanted to create something simple with a clean, minimal interface. Also, this app fixes <a href='https://github.com/CookPete/react-player/issues/7'>issues</a> that other apps still suffer from.
        </dd>
      </dl>
    </section>
  )
}
