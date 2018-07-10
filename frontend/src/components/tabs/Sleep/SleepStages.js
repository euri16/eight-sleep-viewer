import React, { PureComponent } from "react";
import TabContent from '../TabContent'
import CustomHorizontalBar from "../../charts/CustomHorizontalBar";
import DetailLabel from "../../widgets/DetailLabel"
import { calcPercentage, secondsToHours, findScoreStyle, findStyleWithMinValue } from "../../../helpers/Helpers"

const MAX_SCORE = 5

class SleepStages extends PureComponent {

    render() {
        const score = this.props.interval.score
        const formattedScore = this.formattedScore(score)
        const tnt = this.props.interval.tntAmount
        const sleepSeconds = this.sleepSecondsFromInterval(this.props.interval)
        const sleepHours = secondsToHours(sleepSeconds)
        const deepSleepPercentage = calcPercentage(this.props.interval.sleepInfo.get("deep"), sleepSeconds)

        var details = <div id="sleep-stages-details">
            <DetailLabel text="SLEEP SCORE"
                value={formattedScore + "/" + MAX_SCORE}
                popOverTitle="Sleep Score"
                popOverText="It is at-a-glance feedback, which makes it easy to compare your sleep performance over time."
                learnMoreUrl={process.env.REACT_APP_TNT_URL}
                valueStyle={findScoreStyle(formattedScore, MAX_SCORE)} /><br />

            <DetailLabel text="HOURS OF SLEEP"
                value={sleepHours}
                popOverTitle="Are you sleeping enough?"
                popOverText="A good sleep results on a better performance on your day."
                learnMoreUrl={process.env.REACT_APP_MIN_SLEEP_URL}
                valueStyle={findStyleWithMinValue(sleepHours, process.env.REACT_APP_MIN_SLEEP_HOURS)} /><br />

            <DetailLabel text="DEEP SLEEP %"
                value={Math.round(deepSleepPercentage) + "%"}
                popOverTitle="Are you sleeping well?"
                popOverText={"Deep Sleep represents the optimal point of rest, professionals recommend it to be minimum " + process.env.REACT_APP_MIN_DEEP_SLEEP_PERCENTAGE + "% of your total sleep."}
                learnMoreUrl={process.env.REACT_APP_DEEP_SLEEP_URL}
                valueStyle={findStyleWithMinValue(Math.round(deepSleepPercentage), process.env.REACT_APP_MIN_DEEP_SLEEP_PERCENTAGE)} /><br />

            <DetailLabel text={this.tossAndTurnsTitle(tnt)}
                popOverTitle={"You tossed or turned " + tnt + " times last night!"}
                popOverText="Toss and turns can affect sleep time."
                learnMoreUrl={process.env.REACT_APP_TNT_URL} />
        </div>

        return (
            <TabContent
                left={<CustomHorizontalBar labels={Array.from(this.props.interval.sleepInfo.keys())}
                    data={Array.from(this.props.interval.sleepInfo.values())} />}
                    right={details}
                    smLeftWidth={8}
                    smRightWidth={4}
                    mdLeftWidth={8}
                    mdRightWidth={4} />
        )
    }

    sleepSecondsFromInterval(interval) {
        var sum = 0
        for (var [key, value] of interval.sleepInfo) {
            if (key !== "light" && key !== "deep") continue;
            sum += value
        }
        return sum
    }

    tossAndTurnsTitle(tossAndTurns) {
        return tossAndTurns >= 10 ? "You had a turbulent night!" : "You had a peaceful night!"
    }

    formattedScore(score) {
        return (score / 10) / 2
    }
}

export default SleepStages