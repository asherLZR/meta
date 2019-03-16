import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PieChart from './components/charts/PieChart'
import BarChart from'./components/charts/BarChart'

class App extends Component {
    render() {
        return (
            <div className="App">
                <PieChart />
                <BarChart />
             </div>
        );
    }
}

export default App;
