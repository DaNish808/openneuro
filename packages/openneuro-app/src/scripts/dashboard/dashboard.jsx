// dependencies -------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Datasets from './dashboard.datasets.jsx'
import Jobs from './dashboard.jobs.jsx'

const publicDatasets = () => <Datasets public />
const publicJobs = () => <Jobs public />

class Dashboard extends React.Component {
  render() {
    let prefix = '/dashboard'
    let datasets = Datasets
    let jobs = Jobs
    let isPublic = false
    if (this.props.public) {
      prefix = '/public'
      datasets = publicDatasets
      jobs = publicJobs
      isPublic = true
    }
    return (
      <div className="route-wrapper">
        <div className="fade-in inner-route clearfix">
          <div className="col-xs-12">
            <ul className="nav nav-pills tabs">
              <li>
                <NavLink to={prefix + '/datasets'} className="btn-tab">
                  {isPublic ? 'Public' : 'My'} Datasets
                </NavLink>
              </li>
              <li>
                <NavLink to={prefix + '/jobs'} className="btn-tab">
                  {isPublic ? 'Public' : 'My'} Analyses
                </NavLink>
              </li>
            </ul>
            <Switch>
              <Redirect path={prefix} to={prefix + '/datasets'} exact />
              <Route component={datasets} path={prefix + '/datasets'} />
              <Route component={jobs} path={prefix + '/jobs'} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.defaultProps = {
  public: false,
}

Dashboard.propTypes = {
  public: PropTypes.bool,
}

export default Dashboard
