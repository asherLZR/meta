import React from 'react';
import {Pie} from 'react-chartjs-2';


// TODO: will use the data from the database
const SOURCES = {
    "BBC News" : 10, 
    "Huffington Post" : 20, 
    "FOX News" : 30,
    "ABC News" : 10
};

// TODO: will create color constants file
const COLORS = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"];

// build data and options objects for chart js
const DATA =  {
    labels: Object.keys(SOURCES),
    datasets: [{
        label: "sources",
        backgroundColor: COLORS,
        data: Object.values(SOURCES)
    }]
};

const OPTIONS = {
    title: {
        display: true,
        text: "SOURCES"
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