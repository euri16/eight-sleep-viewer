import React, { PureComponent } from "react";
import { Row, Col, Nav, NavItem, Tab } from 'react-bootstrap';
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
            <Tab.Container id="option-tabs" defaultActiveKey={1}>
                <Row className="clearfix">
                    <Col id="sleep-tabs" sm={12}>
                        <Nav bsStyle="pills">
                            <NavItem eventKey={1}>Sleep Quality</NavItem>
                            <NavItem eventKey={2}>Temperature</NavItem>
                            <NavItem eventKey={3}>Health</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey={1}>
                                <SleepStages interval={interval} />
                            </Tab.Pane>
                            <Tab.Pane eventKey={2}>
                                <Temperature roomTemp={interval.timeseries.tempRoomC} bedTemp={interval.timeseries.tempBedC} />
                            </Tab.Pane>
                            <Tab.Pane eventKey={3}>
                                <Health respiratoryRate={interval.timeseries.respiratoryRate} heartRate={interval.timeseries.heartRate} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }

    tossAndTurnsAmount(tossAndTurns) {
        return tossAndTurns.reduce((prev, next) => prev + next[1], 0)
    }

    filterAndSumSleepSeconds(stages, currentStage) {
        return stages.filter(({ stage }) => stage === currentStage)
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