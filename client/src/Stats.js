import React from 'react';
import PieChart from './components/charts/PieChart'
import CategoryProgressBarChart from'./components/charts/CategoryProgressBarChart'
import SourceProgressBarChart from'./components/charts/SourceProgressBarChart'
import TopicProgressBarChart from'./components/charts/TopicProgressBarChart'

import TopicCloud from'./components/charts/TopicCloud'


export default class Stats extends React.Component {
    render() {
        return(
            <div>
                <CategoryProgressBarChart />
                <SourceProgressBarChart />
                <TopicProgressBarChart />
            </div>
        )
    }
}