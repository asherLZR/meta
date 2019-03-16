import React from 'react';
import PieChart from './components/charts/PieChart'
import BarChart from'./components/charts/BarChart'
import TopicCloud from'./components/charts/TopicCloud'


export default class Stats extends React.Component {
    render() {
        return(
            <div>
                <TopicCloud />
                <PieChart />
                <BarChart />
            </div>
        )
    }
}