import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomLineChart from "../../charts/CustomLineChart";
import ProgressTooltipLabel from "../../widgets/ProgressTooltipLabel"
import styles from '../../App.css';

class Health extends PureComponent {
    render() {
        const datasets = [
            this.extractTemps(this.props.respiratoryRate), 
            this.extractTemps(this.props.heartRate)
        ]
        var details = <div id={styles.tempDetails} ><br /><br />
            <ProgressTooltipLabel text={"Your avg breath rate was "+this.tempAverage(this.props.respiratoryRate)+" per min."}
                popOverTitle="Watch the temperature?"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl="process.env.REACT_APP_TEMP_URL"
                progressStyle="success"
                leftIcon="leaf" /><br/><br/>

            <ProgressTooltipLabel text={"Your avg heart rate was  "+this.tempAverage(this.props.heartRate)+"  bpm"}
                popOverTitle="Watch the temperature?"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl="process.env.REACT_APP_TEMP_URL"
                progressStyle="success"
                leftIcon="heart" />
        </div>
        return (
            <TabContent
                left={<CustomLineChart datasets={datasets}/>}
                right={details}
                smLeftWidth={7}
                smRightWidth={5}
                mdLeftWidth={7}
                mdRightWidth={5} />
        )
    }

    tempAverage(roomTemps) {
        const temps = roomTemps.reduce((sum, elem) => sum + elem[1], 0)
        console.log(temps)
        return Math.round(temps/roomTemps.length)
    }

    extractTemps(tempArray) {
        return tempArray.map((temp) => temp[1])
    }
}
export default Health