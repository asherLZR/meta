import React, { Component } from 'react';

import { Route, Switch, NavLink } from 'react-router-dom';
import { Navbar } from 'react-materialize'

// Load pages
import Home from './Home.js';
import Stats from './Stats.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar brand='meta' right>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/login'>Log In</NavLink></li>
          <li><NavLink to='/signup'>Sign Up</NavLink></li>
          <li><NavLink to='/stats'>Stats</NavLink></li>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/stats' component={Stats}/>
        </Switch>
      </div>
    );
  }
}

export default App;
