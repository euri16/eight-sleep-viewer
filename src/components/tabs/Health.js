import React, { PureComponent } from "react";
import TabContent from './TabContent'
import CustomLineChart from "../charts/CustomLineChart";

class Health extends PureComponent {
    render() {
        return (
            <TabContent
                left={<CustomLineChart/>}
                right={<h1>hellow 3 </h1>}
                smLeftWidth={7}
                smRightWidth={5}
                mdLeftWidth={7}
                mdRightWidth={5} />
        )
    }
}
export default Health