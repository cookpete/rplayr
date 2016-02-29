import lscache from 'lscache'
import { stringify } from 'query-string'
import fetch from 'isomorphic-fetch'

const CACHE_EXPIRY = 30 // minutes

// http://ponyfoo.com/articles/es6-number-improvements-in-depth#numberisnan
export function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

export function pluralize (num, phrase, plural) {
  num = isNumber(num) ? num : 0
  plural = plural || phrase + 's'
  return addCommas(num) + ' ' + (num === 1 ? phrase : plural)
}

function addCommas (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function decode (str) {
  if (!str) {
    return str
  }
  return str
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('&amp;', '&')
}

export function fetchJSON (path, query, parseData = (d) => d) {
  const url = path + '?' + stringify(query)
  const cache = lscache.get(url)
  if (cache) {
    return Promise.resolve(cache)
  }
  return fetch(url)
    .then((response) => response.json())
    .then(parseData)
    .then((data) => {
      lscache.set(url, data, CACHE_EXPIRY)
      return data
    })
}
