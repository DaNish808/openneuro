import pubsub from '../pubsub.js'

export const datasetAdded = {
  subscribe: () => pubsub.asyncIterator('datasetAdded'),
}

export const datasetDeleted = {
  subscribe: () => pubsub.asyncIterator('datasetDeleted'),
}

export const snapshotAdded = {
  subscribe: () => pubsub.asyncIterator('snapshotAdded'),
}

export const snapshotDeleted = {
  subscribe: () => pubsub.asyncIterator('snapshotDeleted'),
}

export const datasetValidationUpdated = {
  subscribe: () => pubsub.asyncIterator('datasetValidationUpdated'),
}

export const draftFilesUpdated = {
  subscribe: () => pubsub.asyncIterator('draftFilesUpdated'),
}

export const permissionsUpdated = {
  subscribe: () => pubsub.asyncIterator('permissionsUpdated'),
}
