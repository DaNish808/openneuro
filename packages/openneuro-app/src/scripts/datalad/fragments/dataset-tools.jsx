import React from 'react'
import PropTypes from 'prop-types'
import WarnButton from '../../common/forms/warn-button.jsx'

/**
 * tooltip: text for tooltip
 * icon: fa-icon for this button
 * link: the route associated with the button
 * write: is this a mutation?
 */
const toolConfig = [
  {
    tooltip: 'Download Dataset',
    icon: 'fa-download',
    link: 'download',
    write: false,
  },
  {
    tooltip: 'Publish Dataset',
    icon: 'fa-globe icon-plus',
    link: 'publish',
    write: true,
  },
  {
    tooltip: 'Delete Dataset',
    icon: 'fa-trash',
    link: 'delete',
    write: true,
  },
  {
    tooltip: 'Share Dataset',
    icon: 'fa-user icon-plus',
    link: 'share',
    write: false,
  },
  {
    tooltip: 'Create Snapshot',
    icon: 'fa-camera-retro icon-plus',
    link: 'snapshot',
    write: true,
  },
  {
    tooptip: 'Follow Dataset',
    icon: 'fa-tag icon-plus',
    link: 'follow',
    write: false,
  },
  {
    tooptip: 'Star Dataset',
    icon: 'fa-star icon-plus',
    link: 'star',
    write: false,
  },
]

const DatasetToolButton = ({ tool }) => (
  <div role="presentation" className="tool">
    <WarnButton
      tooltip={tool.tooltip}
      icon={tool.icon}
      modalLink={tool.link}
      warn={tool.write}
    />
  </div>
)

const DatasetTools = ({ edit }) => (
  <div className="col-xs-12 dataset-tools-wrap">
    <div className="tools clearfix">
      {toolConfig.map(tool => (
        <DatasetToolButton tool={tool} key={tool.link} />
      ))}
    </div>
  </div>
)

DatasetTools.propTypes = {
  title: PropTypes.string,
}

export default DatasetTools