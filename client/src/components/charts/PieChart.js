import React from 'react';
import {Pie} from 'react-chartjs-2';

const DATA =  {
    labels: ["TECH", "BUSINESS", "POLITICS", "ENTERTAINMENT"],
    datasets: [{
        label: "GOALS",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [50, 20, 20, 10]
    }]
};

const OPTIONS = {
    title: {
        display: true,
        text: "MY GOALS"
    }
}

class PieChart extends React.Component {
    
    render() {
        return (
            <div>
                <Pie
                    data={DATA} 
                    options={OPTIONS}
                />
            </div>
        );
    }
}

export default PieChart;