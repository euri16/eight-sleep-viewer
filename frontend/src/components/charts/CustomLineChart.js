import React, { PureComponent } from "react";
import { Line } from 'react-chartjs-2'

class CustomLineChart extends PureComponent {
    render() {
        const labelSuffix = this.props.labelSuffix
        var highestItemsAmount = Math.max.apply(Math, this.props.datasets.map(function (o) { return o.length; }))
        var data = {
            labels: Array.apply(null, { length: highestItemsAmount }).map(Number.call, Number),
            datasets: []
        };

        this.props.datasets.forEach((element, ix) => {
            data.datasets.push({
                label: ix,
                key: ix,
                backgroundColor: ix === 0 ? "rgba(255, 113, 113,0.3)" : 'rgba(0, 123, 255,0.3)',
                fillColor: "rgba(255,76,85,0.7)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: element
            })
        });

        var options = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: this.props.stepSize,
                        callback: function (value, index, values) {
                            return value + labelSuffix;
                        }
                    },
                    gridLines: {
                        drawBorder: false,
                    }
                }],
                xAxes: [{
                    barPercentage: 0.3,
                    gridLines: {
                        display: false
                    }
                }]
            }
        }

        return (
            <Line data={data} height={110} options={options} />
        )
    }
}
export default CustomLineChart