import request from './request'
import async from 'async'

/**
 * Maximum Concurrent Requests
 */
let maxRequests = 3

let upload = {
  /**
   * Queue
   *
   * A queueing strategy for upload requests.
   * Allows concurrency up to the value for
   * 'maxRequests'
   */
  queue: async.queue((req, callback) => {
    if (req.func) {
      // container creation requests
      let name = req.args[req.args.length - 1]
      req.progressStart(name)
      req.func.apply(null, req.args).then(res => {
        upload.handleResponse(null, req, res)
        callback()
      })
    } else {
      // file upload requests
      req.file.relativePath = req.file.hasOwnProperty('relativePath')
        ? req.file.relativePath.replace(/^\//, '')
        : req.file.name
      req.file.tags = req.hasOwnProperty('tags')
        ? JSON.stringify(req.tags)
        : '[]'
      req.progressStart(req.file.name)
      request
        .upload(req.url, {
          fields: {
            name: req.file.relativePath,
            tags: req.file.tags,
            file: req.file.data ? req.file.data : req.file,
          },
        })
        .then(() => {
          upload.handleResponse(null, req)
          callback()
        })
        .catch(err => {
          upload.handleResponse(err, req)
          callback()
        })
    }
  }, maxRequests),

  /**
   * Add
   *
   * Takes a file request object & sends it into the
   * upload queue.
   */
  add(req) {
    this.queue.push(req)
  },

  /**
   * Handle Response
   */
  handleResponse(err, req, res) {
    let label = req.file ? req.file.name : req.args[req.args.length - 2]
    if (err) {
      upload.queue.kill()
      req.error()
    } else {
      if (res && req.callback) {
        req.callback(err, res)
      }
      req.progressEnd(label)
    }
  },
}

export default upload
