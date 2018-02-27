// dependencies ----------------------------------------------------------

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import requireAuth from './utils/requireAuth'
import Dataset from './dataset/dataset.jsx'

// wrap with loadable HOC
const FrontPage = loadable(() => import('./front-page/front-page.jsx'))
const Admin = loadable(() => import('./admin/admin.jsx'))
const Dashboard = loadable(() => import('./dashboard/dashboard.jsx'))
const Faq = loadable(() => import('./faq/faq.jsx'))

// routes ----------------------------------------------------------------

const PublicDashboard = () => <Dashboard public />

const appRoutes = () => (
  <Switch>
    <Route name="front-page" exact path="/" component={FrontPage} />
    <Route name="faq" exact path="/faq" component={Faq} />
    <Route
      name="dashboard"
      path="/dashboard"
      component={requireAuth(Dashboard)}
    />
    <Route name="public" path="/public" component={PublicDashboard} />
    <Route name="admin" path="/admin" component={requireAuth(Admin, 'admin')} />
    <Route name="dataset" path="/datasets" component={Dataset} />
  </Switch>
)

export default appRoutes
