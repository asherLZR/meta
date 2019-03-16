import React from 'react';
import { Bar } from 'react-chartjs-2';

class SourceProgressBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},

        };
    };


    componentDidMount() {
        let username = sessionStorage.getItem('username');
        let requestOptions = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        fetch(`/api/v1/stats/progress?username=${username.toString()}`, requestOptions)
            .then(res => {
                return res.json();
            }).then(response => {
                let labelArray = Object.keys(response.source);
                let dataArray = Object.values(response.source);
                let chartData = {
                    labels: labelArray,
                    datasets: [{
                        data: dataArray,
                        backgroundColor: "#6ab04c"
                    }]
                };
                this.setState({ chartData: chartData });
            });
    }

    render() {
        const chartOptions = {
            title: {
                display: true,
                text: "Source Progress"
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        suggestedMin: 0,
                    }
                }]
            }
        }
        return (
            <div>
                <Bar
                    data={this.state.chartData}
                    options={chartOptions}
                />
            </div>
        );
    }
}

export default SourceProgressBarChart;