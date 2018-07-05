import React, { PureComponent } from "react";
import TabContent from './TabContent'
import CustomLineChart from "../charts/CustomLineChart";

class Temperature extends PureComponent {
    render() {
        return (
            <TabContent
                left={<CustomLineChart/>}
                right={<h1>hellow 2 </h1>}
                smLeftWidth={7}
                smRightWidth={5}
                mdLeftWidth={7}
                mdRightWidth={5} />
        )
    }
}
export default Temperature