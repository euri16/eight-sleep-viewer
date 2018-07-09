import React, { Component } from 'react';
import TabsContainer from "./tabs/TabsContainer"
import PageContainer from "./containers/PageContainer"
import SleepDataViewerContainer from "./containers/SleepDataViewerContainer"
import { performHttpCall } from "../helpers/Helpers"
import 'react-dropdown/style.css'

const userURL = process.env.REACT_APP_API_BASE_URL + "user/"

class SleepDataViewer extends Component {

  constructor(props) {
    super(props);
    this.handleDataFetched = this.handleDataFetched.bind(this);
    this.handleUsersFetched = this.handleUsersFetched.bind(this);
    this.handleUserChanged = this.handleUserChanged.bind(this);
    this.handleIntervalChanged = this.handleIntervalChanged.bind(this);
    this.state = {
      intervalArray: null,
      user: null,
      interval: null
    };
  }

  fetchIntervals(url) {
    performHttpCall(url, "GET",
      (response) => {
        const interval = response.intervals[0]
        const itemInterval = {
          value: interval.id,
          label: interval.ts
        }
        this.handleIntervalChanged(response, itemInterval)
      }, (error) => {
        console.log(error)
      })
  }

  handleUsersFetched(users) {
    const user = users[0]
    const itemUser = {
      value: user.id,
      label: user.name
    }
    this.handleUserChanged(itemUser)
  }

  handleDataFetched(users) {
    if (!users) return null
    this.setState({ user: users[0] })
  }

  handleUserChanged(user) {
    this.setState({ user: user })

    if (user) {
      this.fetchIntervals(userURL + user.value)
    }
  }

  handleIntervalChanged(data, interval) {
    if (interval && data) {
      this.setState({ intervalArray: data.intervals, interval: interval })
    }
  }

  render() {
    let data = null
    if (this.state.intervalArray) {
      data = this.state.intervalArray.find((elem) => elem.id === this.state.interval.value)
    }
    const content = !data ? <b>No data</b> : <TabsContainer interval={data} />

    return (
      <PageContainer>
        <SleepDataViewerContainer user={this.state.user}
          interval={this.state.interval}
          onUserChanged={this.handleUserChanged}
          onIntervalChanged={this.handleIntervalChanged}
          onDataFetched={this.handleDataFetched}
          onUsersFetched={this.handleUsersFetched}>
          {content}
        </SleepDataViewerContainer>
      </PageContainer>
    )
  }
}

export default SleepDataViewer;
