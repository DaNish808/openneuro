// dependencies -------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import Actions from './upload.actions.js'
import Input from '../common/forms/input.jsx'

export default class Rename extends React.Component {
  // life cycle events --------------------------------------------------

  render() {
    let dirName = this.props.dirName,
      nameError = this.props.nameError,
      resuming = this.props.resuming,
      renameResumeMessage

    if (resuming) {
      renameResumeMessage = (
        <span className="message error">
          You have selected &ldquo;{this.props.selectedName}&rdquo; and are
          trying to resume &ldquo;{dirName}.&rdquo; Continue if this is correct
          or{' '}
          <span className="upload-reset-link" onClick={Actions.setInitialState}>
            cancel
          </span>.
        </span>
      )
    }

    return (
      <div>
        {!resuming ? (
          <span className="message fade-in">
            Rename your dataset (optional)
          </span>
        ) : null}
        <div className="dir-name has-input clearfix fade-in">
          {nameError ? (
            <span className="message error character-error">{nameError}</span>
          ) : null}
          {renameResumeMessage}
          {this._input(this.props.input, dirName)}
        </div>
        <br />
        <button
          className="btn-blue"
          disabled={nameError}
          onClick={Actions.validate}>
          Continue
        </button>
      </div>
    )
  }

  // template methods ---------------------------------------------------

  _input(display, dirName) {
    if (display) {
      return (
        <div>
          <label className="add-name">
            <i className="folderIcon fa fa-folder-open" />
          </label>
          <Input
            type="text"
            placeholder="dataset name"
            initialValue={dirName}
            onChange={this._updateDirName}
          />
        </div>
      )
    }
  }

  // actions ------------------------------------------------------------

  _updateDirName(e) {
    Actions.updateDirName(e.target.value)
  }
}

Rename.propTypes = {
  dirName: PropTypes.string,
  nameError: PropTypes.string,
  resuming: PropTypes.bool,
  selectedName: PropTypes.string,
  input: PropTypes.bool,
}
