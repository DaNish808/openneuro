import request from 'superagent'
import config from '../config.js'
import { addFileUrl } from './utils.js'
import { redis } from '../libs/redis.js'

/**
 * Hexsha files cache
 */
export const filesKey = (datasetId, revision) => {
  return `openneuro:files:${datasetId}:${revision}`
}

/**
 * Convert to URL compatible path
 * @param {String} path
 */
export const encodeFilePath = path => {
  return path.replace(new RegExp('/', 'g'), ':')
}

/**
 * Convert to from URL compatible path fo filepath
 * @param {String} path
 */
export const decodeFilePath = path => {
  return path.replace(new RegExp(':', 'g'), '/')
}

/**
 * Generate file URL for DataLad service
 * @param {String} datasetId
 * @param {String} path - Relative path for the file
 * @param {String} filename
 */
export const fileUrl = (datasetId, path, filename) => {
  // If path is provided, this is a subdirectory, otherwise a root level file.
  const filePath = path ? [path, filename].join('/') : filename
  const fileName = filename ? encodeFilePath(filePath) : encodeFilePath(path)
  const url = `http://${
    config.datalad.uri
  }/datasets/${datasetId}/files/${fileName}`
  return url
}

/**
 * Get the faster object URL for a file
 * @param {string} datasetId - Dataset accession number
 * @param {string} objectId - Git object id, a sha1 hash for git objects or key for annexed files
 */
export const objectUrl = (datasetId, objectId) => {
  return `http://${
    config.datalad.uri
  }/datasets/${datasetId}/objects/${objectId}`
}

/**
 * Get files for a specific revision
 * Similar to getDraftFiles but different cache key and fixed revisions
 * @param {string} datasetId - Dataset accession number
 * @param {string} hexsha - Git treeish hexsha
 */
export const getFiles = async (datasetId, hexsha) => {
  const key = filesKey(datasetId, hexsha)
  return redis.get(key).then(data => {
    if (data) return JSON.parse(data)
    else
      return request
        .get(
          `${
            config.datalad.uri
          }/datasets/${datasetId}/snapshots/${hexsha}/files`,
        )
        .set('Accept', 'application/json')
        .then(({ body: { files } }) => {
          const filesWithUrls = files.map(addFileUrl(datasetId))
          redis.set(key, JSON.stringify(filesWithUrls))
          return filesWithUrls
        })
  })
}
