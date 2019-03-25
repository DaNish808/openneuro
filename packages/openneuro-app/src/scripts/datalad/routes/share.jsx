import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ShareDataset from '../mutations/share.jsx'

const PermissionRow = ({ userId, email, access }) => (
  <tr>
    <td>{email}</td>
    <td>{access}</td>
    <td>Remove {userId}</td>
  </tr>
)

const Share = ({ datasetId, permissions }) => {
  const [userEmail, setUserEmail] = useState('')
  const [access, setAccess] = useState('read')

  const readActive = access === 'read' && 'active'
  const writeActive = access === 'write' && 'active'
  const adminActive = access === 'admin' && 'active'

  return (
    <div className="dataset-form">
      <div className="col-xs-12 dataset-form-header">
        <div className="form-group">
          <label>Share Dataset</label>
        </div>
        <hr />
        <div className="col-xs-12 dataset-form-body">
          <p>Dataset shared with:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Access</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, index) => (
                <PermissionRow
                  userId={perm.user.id}
                  email={perm.user.email}
                  access={perm.level}
                  key={index}
                />
              ))}
            </tbody>
          </table>
          <div className="row">
            <p>
              Enter a user&#39;s email address and select access level to share
            </p>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
          </div>
          <div className="row btn-group">
            <button
              className={`btn btn-default btn-lg ${readActive}`}
              onClick={() => setAccess('read')}>
              Read
            </button>
            <button
              className={`btn btn-default btn-lg ${writeActive}`}
              onClick={() => setAccess('write')}>
              Write
            </button>
            <button
              className={`btn btn-default btn-lg ${adminActive}`}
              onClick={() => setAccess('admin')}>
              Admin
            </button>
          </div>
        </div>
        <div className="col-xs-12 dataset-form-controls">
          <div className="col-xs-12 modal-actions">
            <Link to={`/datasets/${datasetId}`}>
              <button className="btn-admin-blue">Return to Dataset</button>
            </Link>
            <ShareDataset
              datasetId={datasetId}
              userEmail={userEmail}
              access={access}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Share.propTypes = {
  datasetId: PropTypes.string,
  permissions: PropTypes.array,
}

export default Share