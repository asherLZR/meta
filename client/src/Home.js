import React from 'react';
import { Row, Col } from 'react-materialize'

import LogOut from './LogOut.js';

export default class Home extends React.Component {
    render() {
        return(
            <div>
                <Row>
                    <Col s={4}/>
                    <Col s={4}><h5>Home</h5></Col>
                    <Col s={4}/>
                </Row>
                <Row>
                    <LogOut />
                </Row>
            </div>
        )
    }
}