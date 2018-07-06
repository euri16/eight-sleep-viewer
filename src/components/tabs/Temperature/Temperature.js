import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomLineChart from "../../charts/CustomLineChart";
import ProgressTooltipLabel from "../../widgets/ProgressTooltipLabel"
import styles from '../../App.css';

class Temperature extends PureComponent {
    render() {
        const datasets = [
            this.extractTemps(this.props.roomTemp), 
            this.extractTemps(this.props.bedTemp)
        ]
        var details = <div id={styles.tempDetails} ><br /><br />
            <ProgressTooltipLabel text={"The avg room temperature was "+this.tempAverage(this.props.roomTemp)+"°"}
                popOverTitle="Watch the temperature?"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl={process.env.REACT_APP_TEMP_URL}
                progressStyle="success"
                leftIcon="asterisk" /><br/><br/>

            <ProgressTooltipLabel text={"The avg bed temperature was "+this.tempAverage(this.props.bedTemp)+" degrees"}
                popOverTitle="Watch the temperature?"
                popOverText="A good temperature can help you sleep like an angel."
                learnMoreUrl={process.env.REACT_APP_TEMP_URL}
                progressStyle="success"
                leftIcon="fire" />
        </div>
        return (
            <TabContent
                left={<CustomLineChart datasets={datasets} />}
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
export default Temperature