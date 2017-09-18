// dependencies -------------------------------------------------------

import React        from 'react';
import Reflux       from 'reflux';
import datasetStore from './dataset.store';
import actions      from './dataset.actions';
import Spinner      from '../common/partials/spinner.jsx';
import Run          from './dataset.jobs.run.jsx';
import { Accordion, Panel } from 'react-bootstrap';
import markdown     from '../utils/markdown';

let Jobs = React.createClass({

    mixins: [Reflux.connect(datasetStore)],

    getInitialState () {
        let initialState = {
            acknowledgements:   "",
            support:            "",
            summary:            "",
            label:              "",
        };

        return initialState;
    },

// life cycle events --------------------------------------------------

    render () {
        let version;

        if (!this.state.dataset.original) {
            return false;
        }

        let app = this.state.jobs.map((app) => {

            let newestVersion = Math.max(...Object.keys(this.state.apps[app.label]));
            let appDef = this.state.apps[app.label][newestVersion];
            let {acknowledgements, support} = appDef.descriptions;
            
            version = app.versions.map((version) => {
                let appDef = this.state.apps[app.label][version.label];
                let bidsAppVersion = appDef.containerProperties.environment.filter((tuple) => {
                    return tuple.name === 'BIDS_CONTAINER';
                })[0].value;
                let compositeVersion = bidsAppVersion + ' - #' + version.label;
                return (
                    <Panel className="jobs" header={compositeVersion}  key={version.label} eventKey={version.label}>
                        {this._runs(version)}
                    </Panel>
                );
            });

            return (
                <Panel className="jobs" header={app.label}  key={app.label} eventKey={app.label}>
                    <div className="app-descriptions">
                        <div><label>App created by: </label><span dangerouslySetInnerHTML={markdown.format(acknowledgements)}/></div>
                        <label>{support ? "Support at :" : ''}</label><span dangerouslySetInnerHTML={markdown.format(support)}/>
                    </div>
                    <Accordion accordion className="jobs-wrap" activeKey={this.state.activeJob.version} onSelect={actions.selectJob.bind(null, 'version')}>
                        {version}
                    </Accordion>
                </Panel>
            );
        });

        let header = <h3 className="metaheader">Analyses</h3>;
        return (
            <div className="analyses">
                {app.length === 0 ?  null : header }
                <Accordion accordion className="jobs-wrap" activeKey={this.state.activeJob.app} onSelect={actions.selectJob.bind(null, 'app')}>
                    {this.state.loadingJobs ? <Spinner active={true} text="Loading Analyses" /> : app}
                    <div  />
                </Accordion>
            </div>
        );
    },

// templates methods --------------------------------------------------

    _runs(job, apps) {
        let runs = job.runs.map((run) => {
            return (
                <Run run={run}
                     key={run._id}
                     toggleFolder={actions.toggleResultFolder}
                     displayFile={actions.displayFile}
                     currentUser={this.state.currentUser}
                     apps={apps}
                     />
            );
        });

        return runs;
    } 

});

export default Jobs;
