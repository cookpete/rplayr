import { TRACKING_ID } from './config'

if (typeof window !== 'undefined') {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */

  window.ga('create', TRACKING_ID, 'auto')

  // Track errors
  window.onerror = function (err, url, line) {
    window.ga('send', 'exception', {
      exDescription: err + ' ' + url + ': ' + line
    })
  }

  // Track external link clicks
  document.addEventListener('click', function (e) {
    if (e.target.getAttribute('target') === '_blank') {
      window.ga('send', 'event', 'external', 'click', e.target.getAttribute('href'))
    }
  }, false)
}

export function trackPageView ({ pathname }) {
  window.ga('send', 'pageview', pathname)
}
