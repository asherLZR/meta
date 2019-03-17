import React, { Component } from 'react';

import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { Navbar, Footer } from 'react-materialize'
import './App.css';

// Load pages
import Home from './Home.js';
import Stats from './Stats.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js';
import Profile from './Profile.js';
import Goals from './Goals.js';

import AuthService from './AuthService.js';

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
      }} />
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="body">
        <Navbar className="navbar" brand={<img className="img-logo" src='https://i.imgur.com/QA27FgF.png'></img>} right>
          <li><NavLink className="navbar" to='/'>Home</NavLink></li>
          <li><NavLink className="navbar" to='/stats'>Stats</NavLink></li>
          <li><NavLink className="navbar" to='/goals'>Goals</NavLink></li>
          <li><NavLink className="navbar" to='/logout'>Profile</NavLink></li>
        </Navbar>
        <Switch>
          <SecretRoute exact path='/' component={Home}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <SecretRoute path='/logout' component={Profile}/>
          <SecretRoute path='/stats' component={Stats}/>
          <SecretRoute path='/goals' component={Goals}/>
        </Switch>
        <Footer copyrights="Copyright © 2019 Meta"
          moreLinks={
            <a className="black-text right" href="#!">More Links</a>
          }
          links={
            <ul>
              <li><a className="black-text" href="#!">About</a></li>
              <li><a className="black-text" href="#!">Privacy</a></li>
              <li><a className="black-text" href="#!">Contact Us</a></li>
            </ul>
          }
          className='footer'
        >
            <h6 className="black-text">Meta</h6>
            <p className="black-text">All trademarks are owned by their respective owners.
            Meta is an independent community website which has no association with nor endorsement by the respective trademark owners..</p>
        </Footer>;
      </div>
    );
  }
}

export default App;
