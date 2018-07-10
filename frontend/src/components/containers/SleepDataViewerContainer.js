import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from "react-bootstrap"
import { getArrayFirstItem, performHttpCall } from "../../helpers/Helpers"
import HttpFetcher from "../Http"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import moment from 'moment'

var Spinner = require('react-spinkit')
const usersURL = process.env.REACT_APP_API_BASE_URL + "users"
const userURL = process.env.REACT_APP_API_BASE_URL + "user/"

class SleepDataViewerContainer extends Component {

  componentDidMount() {
    const success = (response) => {
      this.props.onUsersFetched(response.users)
    }
    const error = (error) => { 
      this.props.onError(error)
    }

    performHttpCall(usersURL, "GET", success, error)
  }

  render() {
    return <Panel id="collapsible-panel-example-1" bsStyle="primary" expanded={!this.props.isLoading} onToggle={()=>{}}>
      <Panel.Heading>
        <PanelDropdowns usersOptions={this.usersDropdownOptions(this.props.users)}
          user={this.props.user}
          interval={this.props.interval}
          onIntervalChanged={this.props.onIntervalChanged}
          onUserChanged={this.props.onUserChanged}
          userValue={getArrayFirstItem(this.usersDropdownOptions(this.props.users))}
          isLoading={this.props.isLoading} 
          onError={this.props.onError}/>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          {this.props.children}
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  }

  usersDropdownOptions(users) {
    let options = []
    if (!users) return options
    users.forEach((user) => {
      options.push({
        value: user.id,
        label: user.name
      })
    })
    return options
  }
}

class PanelDropdowns extends Component {

  intervalsOptions(data) {
    let options = []
    if (!data) return options
    data.intervals.forEach((interval) => {
      options.push({
        value: interval.id,
        label: moment(interval.ts).format('LLL')
      })
    })
    return options
  }

  handleIntervalChanged(data, interval) {
    this.props.onIntervalChanged(data, interval)
  }

  render() {
    const userId = !this.props.user ? "" : this.props.user.value
    const url = userURL + userId

    if(!userId) return null
    
    return (
      <Grid>
        <Row>
          <Col xs={5} md={5}>
            <Dropdown options={this.props.usersOptions} onChange={this.props.onUserChanged} value={this.props.user} placeholder="Select an option" />
          </Col>
          <Col xs={5} md={5}>
            <HttpFetcher url={url} key={url}>
              {({ data }) => {
                const intervalsOptions = this.intervalsOptions(data)
                const defaultInterval = this.props.interval
                return <Dropdown disabled={this.props.isLoading} options={intervalsOptions} onChange={this.handleIntervalChanged.bind(this, data)} value={defaultInterval} placeholder="Select an option" />
              }}
            </HttpFetcher>
          </Col>
          <Col xs={2} md={2}>
            {this.props.isLoading &&
              <Spinner className="pull-right" name='line-scale' color="white" />
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default SleepDataViewerContainer;
