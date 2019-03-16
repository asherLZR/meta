import React from 'react';
import {Bar} from 'react-chartjs-2';

// TODO: will use the data from the database
const CATEGORIES = ["TECH", "BUSINESS", "POLITICS", "ENTERTAINMENT"];

const GOALS = {
    "TECH": 30,
    "BUSINESS" : 10,
    "POLITICS" : 20, 
    "ENTERTAINMENT" : 5
}

const PROGRESS = {
    "TECH": 20,
    "BUSINESS" : 8,
    "POLITICS" : 19, 
    "ENTERTAINMENT" : 1
}

// TODO: will create color constants file
const COLORS = ["#6ab04c", "#6ab04c","#6ab04c","#6ab04c","#6ab04c"];
const COLORS2 = ["#eb4d4b", "#eb4d4b","#eb4d4b","#eb4d4b","#eb4d4b"];

// build data and options objects for chart js
const DATA =  {
    labels: CATEGORIES,
    datasets: [
        {
            label: "progress",
            data: CATEGORIES.map(category => PROGRESS[category]),
            backgroundColor: CATEGORIES.map((_, idx) => COLORS[idx])
        },
        {
            label: "remaining",
            data: CATEGORIES.map(category => GOALS[category]-PROGRESS[category]),
            backgroundColor: CATEGORIES.map((_, idx) => COLORS2[idx])
        }
    ]
};
console.log(DATA);
const OPTIONS = {
    title: {
        display: true,
        text: "MY PROGRESS"
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

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},

        };
    };

    componentDidMount() {
        let username = sessionStorage.getItem('username');
        console.log(username.toString());
        let requestOptions = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        fetch(`/api/v1/stats/progress?username=${username.toString()}`, requestOptions)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                let labelArray = Object.keys(response.category);
                let dataArray = Object.values(response.category);
                let chartData = {
                    labels: labelArray,
                    datasets: [{
                        data: dataArray,
                        backgroundColor: "#6ab04c"
                    }]
                };
                this.setState({ chartData: chartData });
            })
    }

    render() {
        return (
            <div>
                <Bar
                    data={this.state.chartData} 
                    options={OPTIONS}
                />
            </div>
        );
    }
}

export default BarChart;