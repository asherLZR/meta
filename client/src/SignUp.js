import React from 'react';

import { Row, Input, Icon, Button } from 'react-materialize'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };
    handleUsernameChange = (e) => {
        this.setState({ username: e.currentTarget.value });
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.currentTarget.value });
    }

    handleSubmit = () => {
        // Send login details to server
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/api/v1/account/signup', requestOptions)
            .then(res => res.json())
            .then(response => { console.log(JSON.stringify(response))})
            .catch(error => console.error(`Error: ${error}`));
    }

    render() {
        return(
            <div>
                <h1>Sign Up</h1>
                <form className='signUpForm'
                    onSubmit={ e=> {
                        e.preventDefault();
                        this.handleSubmit();
                    }}>
                    <Row>
                        <Input placeholder='Username' s={12} label='Username' onChange={this.handleUsernameChange}><Icon medium>person</Icon></Input>
                        <Input type='password' label="Password" s={12} onChange={this.handlePasswordChange}><Icon medium>lock</Icon></Input>
                        <Button waves='light'>Submit</Button>
                    </Row>
                </form>

            </div>
        )
    }
}