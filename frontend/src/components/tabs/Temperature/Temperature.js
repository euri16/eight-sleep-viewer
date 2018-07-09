import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomLineChart from "../../charts/CustomLineChart";
import DetailLabel from "../../widgets/DetailLabel"
import styles from '../../App.css';

class Temperature extends PureComponent {
    render() {
        const datasets = [
            this.extractTemps(this.props.roomTemp),
            this.extractTemps(this.props.bedTemp)
        ]
        var details = <div id={styles.tempDetails}>
            <DetailLabel text="AVG. ROOM TEMP."
                value={this.tempAverage(this.props.roomTemp) + "°"}
                popOverTitle="Watch the temperature"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl={process.env.REACT_APP_TEMP_URL} /><br />

            <DetailLabel text="AVG. BED TEMP."
                value={this.tempAverage(this.props.bedTemp) + "°"}
                popOverTitle="Watch the temperature"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl={process.env.REACT_APP_TEMP_URL} />
        </div>
        return (
            <TabContent
                left={<CustomLineChart datasets={datasets} stepSize={5} labelSuffix={"°"} labelString={"Degrees"}/>}
                right={details}
                smLeftWidth={8}
                smRightWidth={4}
                mdLeftWidth={8}
                mdRightWidth={4} />
        )
    }

    tempAverage(roomTemps) {
        const temps = roomTemps.reduce((sum, elem) => sum + elem[1], 0)
        return Math.round(temps / roomTemps.length)
    }

    extractTemps(tempArray) {
        return tempArray.map((temp) => temp[1])
    }
}
export default Temperature