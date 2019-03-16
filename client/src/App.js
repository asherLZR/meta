import React, { Component } from 'react';

import { Route, Switch, NavLink } from 'react-router-dom';
import { Navbar, Footer } from 'react-materialize'
import './App.css';

// Load pages
import Home from './Home.js';
import Stats from './Stats.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js';

class App extends Component {
  render() {
    return (
      <div className="body">
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
        <Footer copyrights="Copyright © 2019 Meta"
          moreLinks={
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          }
          links={
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">About</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Privacy</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Contact Us</a></li>
            </ul>
          }
          className='footer'
        >
            <h5 className="white-text">Meta</h5>
            <p className="grey-text text-lighten-4">All trademarks are owned by their respective owners.
            Meta is an independent community website which has no association with nor endorsement by the respective trademark owners..</p>
        </Footer>;
      </div>
    );
  }
}

export default App;
