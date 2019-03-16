import React from 'react';

import { Row, Input, Icon } from 'react-materialize'

/*
    For now, the about me page will be the home page
*/
export default class LogIn extends React.Component {
    render() {
        return(
            <div>
                <h1>Log In</h1>
                <div className='logInForm'>
                    <Row>
                        <Input placeholder='Username' s={12} label='Username'><Icon medium>person</Icon></Input>
                        <Input type='password' label="Password" s={12}><Icon medium>lock</Icon></Input>
                    </Row>
                </div>

            </div>
        )
    }
}