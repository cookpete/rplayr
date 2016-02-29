import { join, dirname } from 'path'
import { mkdir, writeFile } from 'fs'
import fetch from 'isomorphic-fetch'

const FETCH_URL = 'https://www.reddit.com/api/multi/user/evilnight?expand_srs=1'
const OUT_FILE = join(__dirname, '..', 'data', 'playlists.json')
const IGNORE_MULTIS = ['redditunes', 'instruments', 'musicmakers', 'agoramusica', 'any']
const DISCOVER_MULTIS = ['truemusic', 'thefirehose', 'thefountain', 'thedrip']

// Fetch data from evilnight’s collection of multi-reddits
// And write to a JSON file of playlists and subreddits
fetch(FETCH_URL)
  .then((response) => response.json())
  .then(parseResponse)
  .then((data) => {
    mkdir(dirname(OUT_FILE), (err) => {
      if (err) throw new Error(err)
      writeFile(OUT_FILE, JSON.stringify(data), (err) => {
        if (err) throw new Error(err)
        process.exit(0)
      })
    })
  }, onError)

function parseResponse (response) {
  let discover = []
  let genres = {}
  let subreddits = {}
  response.forEach((multi) => {
    const { name } = multi.data
    if (IGNORE_MULTIS.indexOf(name) !== -1) {
      return
    }
    if (DISCOVER_MULTIS.indexOf(name) !== -1) {
      const index = DISCOVER_MULTIS.indexOf(name)
      discover[index] = parseMulti(multi)
    } else {
      genres[name] = parseMulti(multi)
    }
    multi.data.subreddits.forEach((subreddit) => {
      subreddits[subreddit.name] = parseSubreddit(subreddit)
    })
  })
  return {
    discover,
    genres: objectToArray(genres),
    subreddits: objectToArray(subreddits).sort(sortBySubscribers)
  }
}

function parseMulti (multi) {
  const { name, path, description_md, subreddits } = multi.data
  return {
    name,
    path,
    description: parseDescription(description_md),
    subscribers: subreddits.reduce((count, subreddit) => {
      return count + subreddit.data.subscribers
    }, 0)
  }
}

function parseSubreddit (subreddit) {
  return {
    name: subreddit.name.toLowerCase(),
    subscribers: subreddit.data.subscribers
  }
}

function parseDescription (description) {
  if (!description || typeof description !== 'string') {
    return ''
  }
  return description
    .match(/[^\n]+/)[0] // Keep everything up to the first newline
    .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1') // Remove markdown links
}

function sortBySubscribers (a, b) {
  return b.subscribers - a.subscribers
}

function objectToArray (object) {
  return Object.keys(object).map((key) => object[key])
}

function onError (err) {
  throw new Error(err)
}
