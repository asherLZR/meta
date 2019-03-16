import React from 'react';
import PieChart from './components/charts/PieChart'
import CategoryProgressBarChart from'./components/charts/CategoryProgressBarChart'
import SourceProgressBarChart from'./components/charts/SourceProgressBarChart'
import TopicProgressBarChart from'./components/charts/TopicProgressBarChart'

import TopicCloud from'./components/charts/TopicCloud'

import './Stats.css';


export default class Stats extends React.Component {
    render() {
        return(
            <div className='statsContainer'>
                <div className='chartDiv'>
                    <CategoryProgressBarChart />
                </div>
                <div className='chartDiv'>
                    <SourceProgressBarChart />
                </div>
                <div className='chartDiv'>
                    <TopicProgressBarChart />
                </div>
            </div>
        )
    }
}