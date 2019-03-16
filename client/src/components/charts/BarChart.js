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
const COLORS = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
const COLORS2 = ["#c45850", "#3e95cd","#8e5ea2","#3cba9f","#e8c3b9"];

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
    componentDidMount() {
        let username = sessionStorage.getItem('username');
        console.log(username.toString());
        fetch(`/api/v1/stats/progress?username=${username.toString()}`)
            .then(res => res.json())
            .then(response => {
                console.log(response);
            })
    }

    render() {
        return (
            <div>
                <Bar
                    data={DATA} 
                    options={OPTIONS}
                />
            </div>
        );
    }
}

export default BarChart;