import React from 'react'
import { PropTypes } from 'prop-types'
import TextInput from '../fragments/text-input.jsx'
import SelectInput from '../fragments/select-input.jsx'
import NumberInput from '../fragments/number-input.jsx'
import TextArrayInput from '../fragments/text-array-input.jsx'
import styled from '@emotion/styled'

const Form = styled.form({
  minWidth: '40rem',
  margingBottom: '5rem',
})
const DisabledNote = styled.div({
  display: 'flex',
  color: '#5cb85c',

  i: {
    marginRight: '0.5rem',
  },
})

const userDependentInput = [
  'associatedPaperDOI:',
  'species',
  'studyLongitudinal',
  'studyDomain',
  'trialCount',
  'studyDesign',
  'openneuroPaperDOI',
  'dxStatus',
]

const metadataFields = [
  {
    key: 'associatedPaperDOI',
    label: 'DOI of paper associated with DS (from submit lab)',
    Component: TextInput,
    additionalProps: {
      required: false,
    },
  },
  {
    key: 'species',
    label: 'Species',
    Component: SelectInput,
    additionalProps: {
      options: [{ value: 'Human' }],
      showOptionOther: true,
      required: false,
    },
  },
  {
    key: 'studyLongitudinal',
    label: 'Study Type',
    Component: SelectInput,
    additionalProps: {
      options: [{ value: 'Longitudinal' }],
      showOptionOther: true,
      required: false,
    },
  },
  {
    key: 'studyDomain',
    label: 'Domain Studied',
    Component: TextInput,
    additionalProps: {
      required: false,
    },
  },
  {
    key: 'trialCount',
    label: 'Number of Trials (if applicable)',
    Component: NumberInput,
    additionalProps: {
      min: -1,
      required: false,
    },
  },
  {
    key: 'studyDesign',
    label: 'Study Design',
    Component: TextInput,
    additionalProps: {
      required: false,
    },
  },
  {
    key: 'openneuroPaperDOI',
    label: 'DOI of paper b/c DS on OpenNeuro',
    Component: TextInput,
    additionalProps: {
      required: false,
    },
  },
  {
    key: 'dxStatus',
    label: 'DX status(es)',
    Component: SelectInput,
    additionalProps: {
      options: [{ value: 'Healthy / Control' }],
      showOptionOther: true,
      required: false,
    },
  },
  {
    key: 'tasksCompleted',
    label: 'Tasks Completed',
    Component: SelectInput,
    additionalProps: {
      options: [{ value: 'True' }, { value: 'False' }],
      showOptionOther: true,
      required: false,
    },
  },
  {
    key: 'datasetId',
    label: 'Dataset ID',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
  {
    key: 'datasetUrl',
    label: 'Dataset URL',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
  {
    key: 'firstSnapshotCreatedAt',
    label: 'First Snapshot (Publish) Date',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      nullMessage: 'dataset has no snapshots',
      required: false,
    },
  },
  {
    key: 'latestSnapshotCreatedAt',
    label: 'Most Recent Snapshot Date',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      nullMessage: 'dataset has no snapshots',
      required: false,
    },
  },
  {
    key: 'adminUsers',
    label: 'Admin Users (email)',
    Component: TextArrayInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
  {
    key: 'datasetName',
    label: 'Dataset Name',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
  {
    key: 'seniorAuthor',
    label: 'Senior Author (Last, First)',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
  {
    key: 'dataProcessed',
    label: 'Has Processed Data',
    Component: TextInput,
    additionalProps: {
      disabled: true,
      required: false,
    },
  },
]

const MetadataForm = ({ values, onChange, hideDisabled }) => (
  <Form id="metadata-form" className="col-xs-6">
    <DisabledNote>
      <i className="fa fa-asterisk" />
      <p>
        Some data is pulled from the dataset for you and cannot be edited here.
      </p>
    </DisabledNote>
    {metadataFields
      .filter(
        field => (hideDisabled ? userDependentInput.includes(field.key) : true),
      )
      .map(({ key, label, Component, additionalProps }, i) => (
        <Component
          name={key}
          label={label}
          value={values[key]}
          onChange={onChange}
          {...additionalProps}
          key={i}
        />
      ))}
  </Form>
)

MetadataForm.propTypes = {
  keyLabelMap: PropTypes.object,
  values: PropTypes.object,
  onChange: PropTypes.func,
  hideDisabled: PropTypes.bool,
}

export default MetadataForm