// dependencies ----------------------------------------------------------------------

import Reflux from 'reflux'
import actions from './notification.actions.js'

// store setup -----------------------------------------------------------------------

let UploadStore = Reflux.createStore({
  listenables: actions,

  init: function() {
    this.setInitialState()
  },

  getInitialState: function() {
    return this.data
  },

  // state data ------------------------------------------------------------------------

  data: {},

  update: function(data, callback) {
    for (let prop in data) {
      this.data[prop] = data[prop]
    }
    this.trigger(this.data, callback)
  },

  /**
     * Set Initial State
     *
     * Sets the state to the data object defined
     * inside the function. Also takes a diffs object
     * which will set the state to the initial state
     * with any differences passed.
     */
  setInitialState: function(diffs, callback) {
    let data = {
      showAlert: false,
      alertType: null,
      alertMessage: '',
      timeout: null,
    }
    for (let prop in diffs) {
      data[prop] = diffs[prop]
    }
    this.update(data, callback)
  },

  // actions ---------------------------------------------------------------------------

  /**
     * Create Alert
     */
  createAlert(alert) {
    this.update({
      showAlert: true,
      alertType: alert.type,
      alertMessage: alert.message,
      timeout: alert.timeout,
    })
    if (alert.timeout != null) {
      window.setTimeout(this.closeAlert, alert.timeout)
    }
  },

  /**
     * Close Alert
     *
     */
  closeAlert() {
    this.setInitialState()
  },
})

export default UploadStore
