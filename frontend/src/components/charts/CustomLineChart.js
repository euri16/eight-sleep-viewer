import React, { PureComponent } from "react";
import { Line} from 'react-chartjs-2'

class CustomLineChart extends PureComponent {
    render() {
        const labelSuffix = this.props.labelSuffix
        var highestItemsAmount = Math.max.apply(Math, this.props.datasets.map(function(o){return o.length;}))
        var data = {
            labels: Array.apply(null, {length: highestItemsAmount}).map(Number.call, Number),
            datasets: []
        };

        this.props.datasets.forEach(element => {
           data.datasets.push ({
                fillColor: "rgba(151,187,205,0.2)",
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
                        callback: function(value, index, values) {
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