import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import DatasetContent from './dataset.content.jsx'
import CreateSnapshot from './tools/snapshot.jsx'
import Publish from './tools/publish.jsx'
import Share from './tools/share.jsx'
import Jobs from './tools/jobs'
import Subscribe from './tools/subscribe.jsx'
import UpdateWarn from './dataset.update-warning.jsx'
import FileEdit from './dataset.file-edit.jsx'
import FileDisplay from './dataset.file-display.jsx'
import DatasetLoader from './dataset.dataset-loader.jsx'
import SnapshotLoader from './dataset.snapshot-loader.jsx'
import ResultsDisplay from './tools/jobs/results-display.jsx'
import LogsDisplay from './tools/jobs/logs-display.jsx'

/**
 * This redirects old URLs ending in /versions to the first snapshot
 */
const SnapshotDefaultRedirect = ({ match }) => {
  return <Redirect to={`/datasets/${match.params.datasetId}/versions/00001`} />
}

SnapshotDefaultRedirect.propTypes = {
  match: PropTypes.object,
}

export default class DatasetRoutes extends React.Component {
  render() {
    return (
      <div>
        {/* Dataset Loader */}
        <Route
          name="dataset-loader"
          path="/datasets/:datasetId"
          component={DatasetLoader}
        />

        {/* Snapshot Loader */}
        <Route
          name="snapshot-loader"
          path="/datasets/:datasetId/versions/:snapshotId"
          component={SnapshotLoader}
        />

        {/* Dataset Route Switch */}
        <Switch>
          {/* Dataset routes */}
          <Route
            name="dataset"
            exact
            path="/datasets/:datasetId"
            component={DatasetContent}
          />
          <Route
            name="snapshot-create"
            exact
            path="/datasets/:datasetId/create-snapshot"
            component={CreateSnapshot}
          />
          <Route
            name="publish"
            exact
            path="/datasets/:datasetId/publish"
            component={Publish}
          />
          <Route
            name="share"
            exact
            path="/datasets/:datasetId/share"
            component={Share}
          />
          <Route
            name="jobs"
            exact
            path="/datasets/:datasetId/jobs"
            component={Jobs}
          />
          <Route
            name="subscribe"
            exact
            path="/datasets/:datasetId/subscribe"
            component={Subscribe}
          />
          <Route
            name="warn"
            exact
            path="/datasets/:datasetId/update-warn"
            component={UpdateWarn}
          />
          <Route
            name="fileEdit"
            exact
            path="/datasets/:datasetId/file-edit"
            component={FileEdit}
          />
          <Route
            name="fileDisplay"
            path="/datasets/:datasetId/file-display"
            component={FileDisplay}
          />

          {/* Snapshot routes */}
          <Route
            name="snapshotDefault"
            exact
            path="/datasets/:datasetId/versions"
            component={SnapshotDefaultRedirect}
          />
          <Route
            name="snapshot"
            exact
            path="/datasets/:datasetId/versions/:snapshotId"
            component={DatasetContent}
          />
          <Route
            name="publish"
            exact
            path="/datasets/:datasetId/versions/:snapshotId/publish"
            component={Publish}
          />
          <Route
            name="share"
            exact
            path="/datasets/:datasetId/versions/:snapshotId/share"
            component={Share}
          />
          <Route
            name="jobs"
            exact
            path="/datasets/:datasetId/versions/:snapshotId/jobs"
            component={Jobs}
          />
          <Route
            name="subscribe"
            exact
            path="/datasets/:datasetId/versions/:snapshotId/subscribe"
            component={Subscribe}
          />
          <Route
            name="warn"
            exact
            path="/datasets/:datasetId/versions/:snapshotId/update-warn"
            component={UpdateWarn}
          />
          <Route
            name="fileDisplay"
            path="/datasets/:datasetId/versions/:snapshotId/file-display"
            component={FileDisplay}
          />
          <Route
            name="resultsDisplay"
            path="/datasets/:datasetId/versions/:snapshotId/results/:filePath"
            component={ResultsDisplay}
          />
          <Route
            name="logsDisplay"
            path="/datasets/:datasetId/versions/:snapshotId/logs/:filePath"
            component={LogsDisplay}
          />
        </Switch>
      </div>
    )
  }
}
