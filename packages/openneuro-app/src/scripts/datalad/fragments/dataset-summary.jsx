// dependencies -------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import bytes from 'bytes'

export default class Summary extends React.Component {
  // life cycle events --------------------------------------------------

  render() {
    return (
      <div className="clearfix">
        {this._summary(this.props.summary, this.props.minimal)}
      </div>
    )
  }

  // custom methods -----------------------------------------------------

  _summary(summary, minimal) {
    if (summary) {
      let numSessions =
        summary.sessions.length > 0 ? summary.sessions.length : 1
      let files = (
        <span>
          <strong> {pluralize('File', summary.totalFiles)}: </strong>
          {summary.totalFiles}
        </span>
      )
      let size = (
        <span>
          <strong>Size: </strong>
          {bytes(summary.size)}
        </span>
      )
      let subjects = (
        <span>
          <strong> {pluralize('Subject', summary.subjects.length)}: </strong>
          {summary.subjects.length}
        </span>
      )
      let sessions = (
        <span>
          <strong>{pluralize('Session', numSessions)}: </strong>
          {numSessions}
        </span>
      )

      if (minimal) {
        return (
          <div className="minimal-summary">
            <div className="summary-data">{files}</div>
            <div className="summary-data">{size}</div>
            <div className="summary-data">{subjects}</div>
            <div className="summary-data">{sessions}</div>
            <div className="summary-data tasks">
              {this._list(<b>Tasks</b>, summary.tasks)}
            </div>
            <div className="summary-data modalities">
              {this._list(<b>Modalities</b>, summary.modalities)}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <hr />
            <h5>
              <b>
                {files}, {size}, {subjects}, {sessions}
              </b>
            </h5>
            <h5>{this._list(<b>Tasks</b>, summary.tasks)}</h5>
            <h5>{this._list(<b>Modalities</b>, summary.modalities)}</h5>
          </div>
        )
      }
    }
  }

  _list(type, items) {
    if (items && items.length > 0) {
      return (
        <span>
          <b>Available</b> {type} : {items.join(', ')}
        </span>
      )
    } else {
      return (
        <span>
          <b>No Available</b> {type}
        </span>
      )
    }
  }
}

Summary.props = {
  summary: null,
  minimal: false,
}

Summary.propTypes = {
  summary: PropTypes.object,
  minimal: PropTypes.bool,
}
