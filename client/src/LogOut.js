import React from 'react';
import { Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import AuthService from './AuthService.js';

export default class LogOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logOut: false,
        };
    };
    handleClick = () => {
        sessionStorage.setItem('session', null);
        sessionStorage.setItem('username', null);
        AuthService.logout();
        this.setState({logOut: true});
    }

    render() {
        if (this.state.logOut) {
            return <Redirect to='/login' />
        }
        return(
            <Button className={this.props.className} waves='light' onClick={this.handleClick}>Log Out</Button>
        )
    }
}

