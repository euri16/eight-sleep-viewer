import React, { PureComponent } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import SleepStages from '../tabs/SleepStages'
import Temperature from "./Temperature";
import Health from "./Health";

class TabsContainer extends PureComponent {
    render() {
        return (
            <Tabs defaultActiveKey={1} id="option-tabs">
                <Tab eventKey={1} title="Your Sleep">
                    <SleepStages/>
                </Tab>

                <Tab eventKey={2} title="Temperature">
                    <Temperature />
                </Tab>
                <Tab eventKey={3} title="Health">
                    <Health />
                </Tab>
            </Tabs>
        )
    }
}

export default TabsContainer;