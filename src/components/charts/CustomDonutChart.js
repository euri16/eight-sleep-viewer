import React, { PureComponent } from "react";
import { Doughnut } from 'react-chartjs-2'

class CustomDonutChart extends PureComponent {
    render() {
        var data = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
        var options = {
            responsive: true
        }
        return (
            <Doughnut data={data} options={options} />
        )
    }
}
export default CustomDonutChart