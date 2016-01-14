import React from 'react'

export default function About () {
  return (
    <section>
      <h2>FAQ</h2>
      <dl>
        <dt>What is this?</dt>
        <dd>
          RedditPlayer creates playlists from any Reddit comments thread, subreddit or multi-reddit.
        </dd>
        <dt>How does it work?</dt>
        <dd>
          The app is written using <a href='https://github.com/facebook/react'>React</a>. It fetches stuff from Reddit using <a href='https://github.com/CookPete/fetch-reddit'>fetch-reddit</a>, then <a href='https://github.com/CookPete/react-player'>react-player</a> plays any supported URLs. See the <a href='https://github.com/CookPete/reddit-player'>source code</a> on GitHub.
        </dd>
        <dt>What can it play?</dt>
        <dd>
          RedditPlayer currently supports YouTube, SoundCloud and Vimeo links.
        </dd>
        <dt>What about <a href='http://radd.it'>radd.it</a>, <a href='https://reddit.musicplayer.io'>reddit.musicplayer.io</a>, <a href='http://redditplaylister.phoenixforgotten.com'>redditplaylister</a>, etc?</dt>
        <dd>
          Yes, there are other apps that do the job. I wanted to create something simple with a clean, minimal interface. Also, this app fixes <a href='https://github.com/CookPete/react-player/issues/7'>issues</a> that other apps still suffer from.
        </dd>
      </dl>
    </section>
  )
}
