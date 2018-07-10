import React, { Component } from 'react';
import TabsContainer from "./tabs/TabsContainer"
import PageContainer from "./containers/PageContainer"
import SleepDataViewerContainer from "./containers/SleepDataViewerContainer"
import { performHttpCall } from "../helpers/Helpers"
import AlertDismissable from "./widgets/AlertDismissable"
import 'react-dropdown/style.css'

const userURL = process.env.REACT_APP_API_BASE_URL + "user/"

class SleepDataViewer extends Component {

  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.handleUsersFetched = this.handleUsersFetched.bind(this);
    this.handleUserChanged = this.handleUserChanged.bind(this);
    this.handleIntervalChanged = this.handleIntervalChanged.bind(this);
    this.state = {
      intervalArray: null,
      user: null,
      users: null,
      interval: null,
      isLoading: true,
      error: null
    };
  }

  render() {
    let data = null;
    let content = null;

    if (this.state.intervalArray) {
      data = this.state.intervalArray.find((elem) => elem.id === this.state.interval.value)
    }

    if (!this.state.isLoading) {
      content = <TabsContainer interval={data} />
    }

    return (
      <PageContainer>
        {this.state.error &&
          <AlertDismissable />
        }
        <SleepDataViewerContainer user={this.state.user}
          users={this.state.users}
          interval={this.state.interval}
          onUserChanged={this.handleUserChanged}
          onIntervalChanged={this.handleIntervalChanged}
          onUsersFetched={this.handleUsersFetched}
          isLoading={this.state.isLoading}
          onError={this.handleError}>
          {content}
        </SleepDataViewerContainer>
      </PageContainer>
    )
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

  handleError(error) {
    this.setState({ error:error })
  }

  handleUsersFetched(users) {
    this.setState({ users: users })
    const user = users[0]
    const itemUser = {
      value: user.id,
      label: user.name
    }
    this.handleUserChanged(itemUser)
  }

  handleUserChanged(user) {
    this.setState({ user: user, isLoading: true })

    if (user) {
      this.fetchIntervals(userURL + user.value)
    }
  }

  handleIntervalChanged(data, interval) {
    if (interval && data) {
      this.setState({ intervalArray: data.intervals, interval: interval, isLoading: false })
    }
  }
}

export default SleepDataViewer;
