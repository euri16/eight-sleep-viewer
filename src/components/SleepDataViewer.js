import React, { Component } from 'react';
import HttpFetcher from "./Http"
import TabsContainer from "./tabs/TabsContainer"

class SleepDataViewer extends Component {
  render() {
    const fileURL = "http://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json"
    return <HttpFetcher url={fileURL}>
      {({ data, isLoading, error }) => {
        if (!data) {
          return <p>No data yet ...</p>;
        }

        if (error) {
          console.log(error)
          return <p>{error.message}</p>;
        }

        if (isLoading) {
          return <p>Loading ...</p>;
        }

        return (<TabsContainer interval={data.intervals[0]} />)
      }}
    </HttpFetcher>
  }
}

export default SleepDataViewer;
