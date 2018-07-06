import React, { PureComponent } from "react";
import { HorizontalBar } from 'react-chartjs-2'

class CustomHorizontalBar extends PureComponent {
    render() {
        var data = {
            labels: this.props.labels,
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 0,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.props.data
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
                gridLines: {
                  display: false,
                },
              }],
              xAxes: [{
                  display:false,
                  gridLines: {
                      display:false
                  }
              }]
            }
        }
        return (
            <HorizontalBar data={data} options={options} />
        )
    }
}
export default CustomHorizontalBar