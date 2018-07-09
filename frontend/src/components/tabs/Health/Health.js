import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomLineChart from "../../charts/CustomLineChart";
import DetailLabel from "../../widgets/DetailLabel"
import styles from '../../App.css';

class Health extends PureComponent {
    render() {
        const datasets = [
            this.extractTemps(this.props.respiratoryRate), 
            this.extractTemps(this.props.heartRate)
        ]
        var details = <div id={styles.tempDetails}>
            <DetailLabel text="AVG. BREATH RATE"
                value={this.tempAverage(this.props.respiratoryRate)}
                valueLabel="per minute"
                popOverTitle="BREATH RATE"
                popOverText="We track your breath rate while you sleep."
                learnMoreUrl={process.env.REACT_APP_HEALTH_URL} /><br />

            <DetailLabel text="AVG. HEART RATE"
                value={this.tempAverage(this.props.heartRate)}
                valueLabel="beats per minute"
                popOverTitle="HEART RATE"
                popOverText="We track your heart rate while you sleep."
                learnMoreUrl={process.env.REACT_APP_HEALTH_URL} />
        </div>
        return (
            <TabContent
                left={<CustomLineChart datasets={datasets} stepSize={30} labelSuffix={" bpm"} labelString="Beats or events per min"/>}
                right={details}
                smLeftWidth={8}
                smRightWidth={4}
                mdLeftWidth={8}
                mdRightWidth={4} />
        )
    }

    tempAverage(roomTemps) {
        const temps = roomTemps.reduce((sum, elem) => sum + elem[1], 0)
        return Math.round(temps/roomTemps.length)
    }

    extractTemps(tempArray) {
        return tempArray.map((temp) => temp[1])
    }
}
export default Health