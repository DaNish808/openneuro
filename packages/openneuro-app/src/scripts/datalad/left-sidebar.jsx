import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SidebarRow = ({ datasetId, id, version, draft = false }) => {
  const url = draft
    ? `/datasets/${datasetId}`
    : `/datasets/${datasetId}/versions/${version}`
  return (
    <li key={id}>
      <Link to={url}>
        <div className="clearfix">
          <div className=" col-xs-12">
            <span className="dataset-type">{version}</span>
            <span className="date-modified" />
            <span className="icons" />
          </div>
        </div>
      </Link>
    </li>
  )
}

SidebarRow.propTypes = {
  datasetId: PropTypes.string,
  id: PropTypes.string,
  version: PropTypes.string,
  draft: PropTypes.boolean,
}

const LeftSidebar = ({ datasetId, snapshots }) => (
  <div className="left-sidebar">
    <span className="slide">
      <div role="presentation" className="snapshot-select">
        <span>
          <h3>Versions</h3>
          <ul>
            <SidebarRow
              key={'Draft'}
              id={datasetId}
              datasetId={datasetId}
              version={'Draft'}
              draft
            />
            {snapshots.map(snapshot => (
              <SidebarRow
                key={snapshot.id}
                id={snapshot.id}
                datasetId={datasetId}
                version={snapshot.tag}
                modified={new Date()}
              />
            ))}
          </ul>
        </span>
      </div>
    </span>
  </div>
)

LeftSidebar.propTypes = {
  datasetId: PropTypes.string,
  snapshots: PropTypes.array,
}

export default LeftSidebar
