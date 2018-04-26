/**
 * Service worker entry point
 *
 * Be careful to only include necessary dependencies here
 */
import { zipResponse } from './serviceworker/s3'
import config from '../../config'

const CACHE_NAME = 'openneuro'
const CACHE_PATHS = serviceWorkerOption.assets

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_PATHS)
    }),
  )
})

self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method === 'GET') {
    const url = new URL(event.request.url)
    const bucket = config.aws.s3.datasetBucket
    const bucketHostname = `${bucket}.s3.amazonaws.com`
    if (url.hostname.endsWith(bucketHostname)) {
      // Respond from the service worker
      const hostname = url.hostname
      const prefix = url.pathname.slice(1)
      return event.respondWith(zipResponse(hostname, prefix))
    } else {
      // Skip serving from cache for cross origin 'only-if-cached' requests
      if (
        event.request.cache === 'only-if-cached' &&
        event.request.mode !== 'same-origin'
      )
        return
      // Respond from cache, then the network
      event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
          return cache.match(event.request).then(response => {
            return response || fetch(event.request)
          })
        }),
      )
    }
  }
})
