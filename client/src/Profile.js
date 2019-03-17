import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Row, Input, Icon, Button, Card, Col } from 'react-materialize'
import AuthService from './AuthService.js';
import LogOut from './LogOut.js';

export default class LogIn extends React.Component {

    render() {


        return(
            <Row>
                <LogOut/>
            </Row>
        )
    }
}