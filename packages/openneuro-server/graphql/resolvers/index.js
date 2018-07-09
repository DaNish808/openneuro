import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLUpload } from 'apollo-upload-server'
import GraphQLBigInt from 'graphql-bigint'
import {
  dataset,
  datasets,
  createDataset,
  deleteDataset,
  createSnapshot,
  deleteSnapshot,
  updatePublic,
  updateFiles,
  deleteFiles,
  updateSnapshotFileUrls,
} from './dataset.js'
import { updateSummary, updateValidation } from './validation.js'
import { draft, snapshot, snapshots, partial } from './datalad.js'
import { whoami, user, users, removeUser, setAdmin } from './user.js'
import {
  permissions,
  updatePermissions,
  removePermissions,
} from './permissions.js'
import {
  datasetAdded,
  datasetDeleted,
  datasetValidationUpdated,
  draftFilesUpdated,
  snapshotAdded,
  snapshotDeleted,
  permissionsUpdated,
} from './subscriptions.js'

export default {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Upload: GraphQLUpload,
  BigInt: GraphQLBigInt,
  Query: {
    dataset,
    datasets,
    whoami,
    user,
    users,
    snapshot,
    partial,
  },
  Mutation: {
    createDataset,
    updateFiles,
    deleteDataset,
    deleteFiles,
    createSnapshot,
    deleteSnapshot,
    updateSummary,
    updateValidation,
    updateSnapshotFileUrls,
    updatePublic,
    updatePermissions,
    removePermissions,
    removeUser,
    setAdmin,
  },
  Subscription: {
    datasetAdded,
    datasetDeleted,
    datasetValidationUpdated,
    draftFilesUpdated,
    snapshotAdded,
    snapshotDeleted,
    permissionsUpdated,
  },
  User: user,
  Dataset: {
    uploader: ds => user(ds, { id: ds.uploader }),
    draft,
    snapshots,
    permissions: ds =>
      permissions(ds).then(p =>
        p.map(permission =>
          Object.assign(permission, {
            user: user(ds, { id: permission.userId }),
          }),
        ),
      ),
  },
}
