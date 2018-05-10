import React from 'react'
import PropTypes from 'prop-types'
import ClickToEdit from '../common/forms/click-to-edit.jsx'
import DatasetRoutes from './dataset-routes.jsx'

const DatasetMain = ({ dataset }) => (
  <div className="row">
    <h1 className="clearfix">
      <ClickToEdit
        value={dataset.label}
        label={dataset.label}
        editable={true}
        onChange={() => {}}
        type="string"
      />
    </h1>
    <DatasetRoutes dataset={dataset} />
  </div>
)

DatasetMain.propTypes = {
  dataset: PropTypes.object,
}

export default DatasetMain
