# rplayr

[![Build Status](https://img.shields.io/travis/CookPete/rplayr/master.svg)](https://travis-ci.org/CookPete/rplayr)
[![Dependency Status](https://img.shields.io/david/CookPete/rplayr.svg)](https://david-dm.org/CookPete/rplayr)
[![devDependency Status](https://img.shields.io/david/dev/CookPete/rplayr.svg)](https://david-dm.org/CookPete/rplayr#info=devDependencies)

Source code for [rplayr](http://rplayr.com)

<img src='https://cloud.githubusercontent.com/assets/1926029/13465587/4d68ebbc-e08e-11e5-9e44-0c1d4169e32b.png' width='600' />

## FAQ

### What is this?
rplayr creates playlists from any Reddit comment thread, subreddit or multi-reddit. Just replace <strong>reddit.com</strong> in any Reddit URL to <strong>rplayr.com</strong> and you’re good.

### How does it work?
The app is written using [React](https://facebook.github.io/react). It fetches stuff from Reddit using [fetch-reddit](https://github.com/CookPete/fetch-reddit), then [react-player](https://github.com/CookPete/react-player) plays any supported URLs. Playlists are curated by the mighty [evilnight](https://www.reddit.com/r/listentothis/comments/1iwc8n/meta_announcing_the_official_rlistentothis_music/) over at [/r/listentothis](https://www.reddit.com/r/listentothis).

### What can it play?
rplayr currently supports YouTube, SoundCloud and Vimeo links.

### What about [radd.it](http://radd.it), [reddit.musicplayer.io](https://reddit.musicplayer.io), [redditplaylister](http://redditplaylister.phoenixforgotten.com), etc?
Yes, there are other apps that do the job. I wanted to create something simple with a clean, minimal interface. Also, this app fixes [issues](https://github.com/CookPete/react-player/issues/7) that other apps still suffer from.

## Development

See the app [in action](http://rplayr.com) or run it locally yourself:

```bash
git clone https://github.com/CookPete/rplayr.git
cd rplayr
npm install
npm run fetch-playlists
npm start
open http://localhost:3000
```

### Fetching playlists

The lists of playlists and subreddits on the front page is parsed from a set of multi-reddits curated by [evilnight](https://www.reddit.com/r/listentothis/comments/1iwc8n/meta_announcing_the_official_rlistentothis_music/). This script fetches the data from the Reddit API, and writes only what the app needs to `/data/playlists.json`.

```bash
npm run fetch-playlists
```

### Building

Running will compile all code into a single JS and CSS file inside `dist`. There is also a super-minimal html file to run the app.

```bash
npm run build
```

### Linting

This project uses [standard](https://github.com/feross/standard) and [scss-lint](https://github.com/brigade/scss-lint) to prevent errors and keep code styles consistent.

```bash
npm run lint
```

### Testing

This project uses [mocha](https://github.com/mochajs/mocha) with [chai](https://github.com/chaijs/chai) assertions for unit testing.

```bash
npm run test
```

## Thanks

* [gaearon](https://github.com/gaearon) for his [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate), which this repo is roughly based on.
* [evilnight](https://reddit.com/user/evilnight) and the mods at [/r/listentothis](https://reddit.com/r/listentothis) for the great library of multi-reddits to use as playlists.
