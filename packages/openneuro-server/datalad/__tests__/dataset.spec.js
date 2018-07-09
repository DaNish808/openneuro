import request from 'superagent'
import mongo from '../../libs/mongo.js'
import { createDataset } from '../dataset.js'
import { createSnapshot } from '../snapshots.js'
import config from '../../config.js'

// Mock requests to Datalad service
jest.mock('superagent')
jest.mock('../../libs/redis.js')

beforeAll(async () => {
  await mongo.connect()
  await mongo.collections.crn.counters.insertMany([
    { _id: 'datasets', sequence_value: 1 },
  ])
})

describe('dataset model operations', () => {
  describe('createDataset()', () => {
    it('resolves to dataset id string', async done => {
      const testLabel = 'test dataset'
      const { id: dsId } = await createDataset(testLabel)
      expect(dsId).toHaveLength(8)
      expect(dsId.slice(0, 2)).toBe('ds')
      done()
    })
    it('adds the dataset to the datasets collection', async done => {
      const label = 'test dataset'
      await createDataset(label)
      const dsObj = await mongo.collections.crn.datasets.findOne({
        label,
      })
      expect(dsObj).toHaveProperty('id')
      expect(dsObj).toHaveProperty('label', label)
      done()
    })
    it('posts to the DataLad /datasets/{dsId} endpoint', async done => {
      // Reset call count for request.post
      request.post.mockClear()
      const label = 'test dataset'
      await createDataset(label)
      expect(request.post).toHaveBeenCalledTimes(1)
      expect(request.post).toHaveBeenCalledWith(
        expect.stringContaining(`${config.datalad.uri}/datasets/`),
      )
      done()
    })
  })
  describe('createSnapshot()', () => {
    it('posts to the DataLad /datasets/{dsId}/snapshots/{snapshot} endpoint', async done => {
      const tag = 'snapshot'
      const dsId = await createDataset('a label')
      // Reset call count for request.post
      request.post.mockClear()
      request.__setMockResponseBody({})
      await createSnapshot(dsId, tag, false)
      expect(request.post).toHaveBeenCalledTimes(1)
      expect(request.post).toHaveBeenCalledWith(
        expect.stringContaining(
          `${config.datalad.uri}/datasets/${dsId}/snapshots/${tag}`,
        ),
      )
      done()
    })
  })
})
