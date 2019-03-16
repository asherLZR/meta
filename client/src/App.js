import React, { Component } from 'react';

import { Route, Switch, NavLink } from 'react-router-dom';
import { Navbar } from 'react-materialize'

// Load pages
import Home from './Home.js';
import Stats from './Stats.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar brand='meta' right>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/stats'>Stats</NavLink></li>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/stats' component={Stats}/>
        </Switch>
      </div>
    );
  }
}

export default App;
