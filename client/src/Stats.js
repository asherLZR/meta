import React from 'react';
import PieChart from './components/charts/PieChart'
import BarChart from'./components/charts/BarChart'
/*
    For now, the about me page will be the home page
*/
export default class Stats extends React.Component {
    render() {
        return(
            <div>
                <p>Stats</p>
                <PieChart />
                <BarChart />
            </div>
        )
    }
}