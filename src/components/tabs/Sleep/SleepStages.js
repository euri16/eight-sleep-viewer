import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomHorizontalBar from "../../charts/CustomHorizontalBar";
import ProgressTooltipLabel from "../../widgets/ProgressTooltipLabel"
import SleepScore from "./SleepScore"

class SleepStages extends PureComponent {
    render() {
        const score = this.props.interval.score
        const tnt = this.props.interval.tntAmount
        const sleepSeconds = this.sleepSecondsFromInterval(this.props.interval)
        const sleepHours = this.secondsToHours(sleepSeconds)
        const deepSleepPercentage = this.findPercentage(this.props.interval.sleepInfo.get("deep"), sleepSeconds)

        console.log(sleepSeconds)
        console.log(this.props.interval)
        var details = <div id="sleep-stages-details"><br />
            <SleepScore score={score} /><br />
            <span>
                <ProgressTooltipLabel text={this.tossAndTurnsTitle(tnt)}
                    popOverTitle={"You tossed or turned " + tnt + " times last night!"}
                    popOverText="Toss and turns can affect sleep time."
                    learnMoreUrl={process.env.REACT_APP_TNT_URL}
                    leftIcon="fire" />
            </span><br /><br />
            <ProgressTooltipLabel text={"You had " + sleepHours + " hours of sleep"}
                progress={this.findPercentage(sleepHours, process.env.REACT_APP_MIN_SLEEP_HOURS)}
                popOverTitle="Are you sleeping enough?"
                popOverText="A good sleep results on a better performance on your day."
                learnMoreUrl={process.env.REACT_APP_MIN_SLEEP_URL}
                progressStyle={this.sleepProgressStyle(sleepHours)} />

            <ProgressTooltipLabel text={"You had " + deepSleepPercentage.toFixed(0) + "% of deep sleep"}
                progress={this.findPercentage(deepSleepPercentage, process.env.REACT_APP_MIN_DEEP_SLEEP_PERCENTAGE)}
                popOverTitle="Are you sleeping well?"
                popOverText={"Deep Sleep represents the optimal point of rest, professionals recommend it to be minimum " + process.env.REACT_APP_MIN_DEEP_SLEEP_PERCENTAGE + "% of your total sleep."}
                learnMoreUrl={process.env.REACT_APP_DEEP_SLEEP_URL}
                progressStyle="danger" />
        </div>

        return (
            <TabContent
                left={<CustomHorizontalBar labels={ Array.from(this.props.interval.sleepInfo.keys()) }
                    data={Array.from(this.props.interval.sleepInfo.values())} />}
                right={details}
                smLeftWidth={8}
                smRightWidth={4}
                mdLeftWidth={7}
                mdRightWidth={5} />
        )
    }

    secondsToHours(seconds) {
        return (((seconds) / 60) / 60).toFixed(1)
    }

    sleepSecondsFromInterval(interval) {
        var sum = 0
        for (var [key, value] of interval.sleepInfo) {
            if(key !== "light" && key !== "deep") continue;
            sum += value
        }
        return sum
    }

    findPercentage(partialNumber, total) {
        return (partialNumber * 100) / total

    }

    sleepProgressStyle(sleepHours) {
        return sleepHours >= process.env.REACT_APP_MIN_SLEEP_HOURS ? "success" : "warning"
    }

    tossAndTurnsTitle(tossAndTurns) {
        return tossAndTurns >= 10 ? "You had a turbulent night!" : "You had a peaceful night!"
    }
}

export default SleepStages