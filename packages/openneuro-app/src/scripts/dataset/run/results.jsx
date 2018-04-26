/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import actions from '../dataset.actions'
import { Accordion, Panel } from 'react-bootstrap'
import FileTree from '../../common/partials/file-tree.jsx'
import DownloadAll from './download-all.jsx'
import markdown from '../../utils/markdown'

const JobResults = ({ run, acknowledgements, displayFile, toggleFolder }) => {
  const type = 'results'
  const jobStatus = run.analysis ? run.analysis.status : null
  if (run[type] && (jobStatus === 'FAILED' || jobStatus === 'SUCCEEDED')) {
    return (
      <Accordion accordion className="results">
        <Panel
          className="fade-in"
          header={type}
          key={run._id}
          eventKey={run._id}>
          <div className="app-acknowledgements">
            <label>Acknowledgements</label>
            <div
              className="markdown"
              dangerouslySetInnerHTML={markdown.format(acknowledgements)}
            />
          </div>
          <hr />
          <DownloadAll run={run} />
          <div className="file-structure fade-in panel-group">
            <div className="panel panel-default">
              <div className="panel-collapse" aria-expanded="false">
                <div className="panel-body">
                  <FileTree
                    tree={run[type]}
                    treeId={run._id}
                    editable={false}
                    getFileDownloadTicket={actions.getResultDownloadTicket.bind(
                      this,
                      run.snapshotId,
                      run._id,
                    )}
                    displayFile={displayFile.bind(
                      this,
                      run.snapshotId,
                      run._id,
                    )}
                    toggleFolder={toggleFolder}
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Accordion>
    )
  } else {
    return null
  }
}

JobResults.propTypes = {
  run: PropTypes.object,
  acknowledgements: PropTypes.string,
  displayFile: PropTypes.func,
  toggleFolder: PropTypes.func,
}

export default JobResults
