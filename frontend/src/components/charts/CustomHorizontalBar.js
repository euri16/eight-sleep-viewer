import React, { PureComponent } from "react";
import { Bar } from 'react-chartjs-2'
import { between } from '../../helpers/Helpers'

const ACCEPTABLE_LIGHT_SLEEP = 60
const ACCEPTABLE_OUT_AWAKE = 15

class CustomHorizontalBar extends PureComponent {

    render() {
        const percentBasedArray = this.percentBasedArray(this.props.data)
        var data = {
            labels: this.props.labels,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: this.barColorArray(percentBasedArray),
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 0,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: percentBasedArray
                }
            ]
        };

        var options = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 20,
                        callback: function(value, index, values) {
                            return value + "%";
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage of each stage'
                    },
                    gridLines: {
                        drawBorder: false,
                    }
                }],
                xAxes: [{
                    barPercentage: 0.3,
                    gridLines: {
                        display: false,
                    }
                }]
            }
        }
        return (
            <Bar data={data} options={options} />
        )
    }

    percentBasedArray(dataArray) {
        const arraySum = dataArray.reduce((sum, elem) => sum + elem)
        return dataArray.map((elem) => (elem * 100) / arraySum)
    }

    barColorArray(percentsArray) {
        var colors = []
        var labels = this.props.labels

        percentsArray.forEach((element, index) => {
            const label = labels[index]
            switch (label) {
                case "light":
                    var color = between(element, 0, ACCEPTABLE_LIGHT_SLEEP / 2) ? 'rgba(255,76,85,0.7)' : 'rgba(0, 123, 255,0.7)'
                    color = between(element, ACCEPTABLE_LIGHT_SLEEP / 2, ACCEPTABLE_LIGHT_SLEEP) ? 'rgba(255,172,20,0.7)' : color
                    color = between(element, ACCEPTABLE_LIGHT_SLEEP, 100) ? 'rgba(0, 123, 255,0.7)' : color
                    colors.push(color)
                    break
                case "deep":
                    const minDeepSleep = process.env.REACT_APP_MIN_DEEP_SLEEP_PERCENTAGE
                    color = between(element, 0, minDeepSleep / 2) ? 'rgba(255,76,85,0.7)' : 'rgba(0, 123, 255,0.7)'
                    color = between(element, minDeepSleep / 2, minDeepSleep) ? 'rgba(255,172,20,0.7)' : color
                    color = between(element, minDeepSleep, 100) ? 'rgba(0, 123, 255,0.7)' : color
                    colors.push(color)
                    break
                case "out":
                case "awake":
                    color = between(element, 100, ACCEPTABLE_OUT_AWAKE * 2) ? 'rgba(255,76,85,0.7)' : 'rgba(0, 123, 255,0.7)'
                    color = between(element, ACCEPTABLE_OUT_AWAKE * 2, ACCEPTABLE_OUT_AWAKE) ? 'rgba(255,172,20,0.7)' : color
                    color = between(element, ACCEPTABLE_OUT_AWAKE, 0) ? 'rgba(0, 123, 255,0.7)' : color
                    colors.push(color)
                    break
                default:
                    colors.push('rgba(0, 123, 255,0.7)')
                    break
            }
        });
        return colors
    }
}
export default CustomHorizontalBar