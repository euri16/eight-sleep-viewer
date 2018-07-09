import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from "react-bootstrap"
import { getArrayFirstItem, performHttpCall } from "../../helpers/Helpers"
import HttpFetcher from "../Http"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const usersURL = process.env.REACT_APP_API_BASE_URL + "users"
const userURL = process.env.REACT_APP_API_BASE_URL + "user/"

class SleepDataViewerContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }

  componentDidMount() {
    const success = (response) => {
      this.setState({ users: response })
      this.props.onUsersFetched(response.users)
    }
    const error = () => { }

    performHttpCall(usersURL, "GET", success, error)

  }

  render() {
    console.log("RENDERING SleepDataViewerContainer")
    return <Panel bsStyle="primary">
      <Panel.Heading>
        <PanelDropdowns usersOptions={this.usersDropdownOptions(this.state.users)}
          user={this.props.user}
          interval={this.props.interval}
          onIntervalChanged={this.props.onIntervalChanged}
          onUserChanged={this.props.onUserChanged}
          userValue={getArrayFirstItem(this.usersDropdownOptions(this.state.users))} />
      </Panel.Heading>
      <Panel.Body>
        {this.props.children}
      </Panel.Body>
    </Panel>
  }

  usersDropdownOptions(users) {
    let options = []
    if (!users) return options
    users.users.forEach((user) => {
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
        label: interval.ts
      })
    })
    return options
  }

  handleIntervalChanged(data, interval) {
    this.props.onIntervalChanged(data, interval)
  }

  render() {
    console.log("RENDERING PanelDropdowns")
    const userId = !this.props.user ? "" : this.props.user.value
    const url = userURL + userId
    return (
      <Grid>
        <Row>
          <Col xs={5} md={5}>
            <Dropdown options={this.props.usersOptions} onChange={this.props.onUserChanged} value={this.props.user} placeholder="Select an option" />
          </Col>
          <Col xs={4} md={4}>
            <HttpFetcher url={url} key={url}>
              {({ data, isLoading, error }) => {
                const intervalsOptions = this.intervalsOptions(data)
                const defaultInterval = intervalsOptions[0]
                return <Dropdown options={intervalsOptions} onChange={this.handleIntervalChanged.bind(this, data)} value={this.props.interval || defaultInterval} placeholder="Select an option" />
              }}
            </HttpFetcher>
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default SleepDataViewerContainer;
