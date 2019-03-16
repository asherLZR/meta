import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const DATA =  {
    labels: ["TECH", "BUSINESS", "POLITICS", "ENTERTAINMENT"],
    datasets: [{
        label: "PROGRESS",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [30, 15, 20, 5]
    }]
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
            ticks: {
                suggestedMin: 0,
                suggestedMax: 50
            }
        }]
    }
}

class BarChart extends React.Component {
    
    render() {
        return (
            <div>
                <HorizontalBar
                    data={DATA} 
                    options={OPTIONS}
                />
            </div>
        );
    }
}

export default BarChart;