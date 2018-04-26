import React from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { pageTitle, pageDescription } from './resources/strings.js'
import Index from './index.jsx'
import analyticsWrapper from './utils/analytics.js'

const App = () => {
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Router>
        <Route component={analyticsWrapper(Index)} />
      </Router>
    </div>
  )
}

export default App
