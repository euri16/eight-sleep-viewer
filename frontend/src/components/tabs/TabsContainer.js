import React, { PureComponent } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import SleepStages from '../tabs/Sleep/SleepStages'
import Temperature from "./Temperature/Temperature";
import Health from "./Health/Health";

const LIGHT_SLEEP = "light"
const DEEP_SLEEP = "deep"
const OUT_OF_BED = "out"
const AWAKE = "awake"

class TabsContainer extends PureComponent {
    render() {
        const interval = this.props.interval
        interval.tntAmount = this.tossAndTurnsAmount(interval.timeseries.tnt)
        interval.sleepInfo = this.sleepInfo(interval.stages)
        
        return (
            <Tabs defaultActiveKey={1} id="option-tabs">
                <Tab eventKey={1} title="Your Sleep">
                    <SleepStages interval={interval}/>
                </Tab>

                <Tab eventKey={2} title="Temperature">
                    <Temperature roomTemp={interval.timeseries.tempRoomC} bedTemp={interval.timeseries.tempBedC} />
                </Tab>
                <Tab eventKey={3} title="Health">
                    <Health respiratoryRate={interval.timeseries.respiratoryRate} heartRate={interval.timeseries.heartRate} />
                </Tab>
            </Tabs>
        )
    }
    
    tossAndTurnsAmount(tossAndTurns) {
        return tossAndTurns.reduce((prev, next) => prev + next[1], 0)
    }

    filterAndSumSleepSeconds(stages, currentStage) {
        return stages.filter(({stage}) => stage === currentStage)
            .reduce((prev, next) => prev + parseInt(next.duration, 10), 0)
    }

    sleepInfo(stages) {
        var map = new Map()
        map.set(LIGHT_SLEEP, this.filterAndSumSleepSeconds(stages, LIGHT_SLEEP))
        map.set(DEEP_SLEEP, this.filterAndSumSleepSeconds(stages, DEEP_SLEEP))
        map.set(OUT_OF_BED, this.filterAndSumSleepSeconds(stages, OUT_OF_BED))
        map.set(AWAKE, this.filterAndSumSleepSeconds(stages, AWAKE))
        return map
    }
}

export default TabsContainer;