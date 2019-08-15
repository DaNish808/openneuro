import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import WarnButton from '../../common/forms/warn-button.jsx'


const MetadataTool = ({ datasetId, metadata, history }) => {
  const hasMetadata = metadata !== null
  return (
    <WarnButton
      tooltip={hasMetadata ? 'Metadata' : 'Add Metadata'}
      icon={hasMetadata ? 'fa-file-code-o' : 'fa-file-code-o icon-plus'}
      warn={false}
      action={() => {
        history.push({
          pathname: hasMetadata
            ? `/datasets/${datasetId}/metadata`
            : `/datasets/${datasetId}/metadata/edit`
        })
      }}
    />
  )
}

MetadataTool.propTypes = {
  metadata: PropTypes.object,
  following: PropTypes.object,
}

export default withRouter(MetadataTool)