import React from 'react';
import { Redirect } from 'react-router-dom';

import { Col, Row, Input, Icon, Button } from 'react-materialize'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            successfulLogIn: false,
            signUpError: false,
            errorMessage: '',
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
            .then(response => { 
                console.log(response);
                if(response.success) {
                    this.setState({
                        successfulLogIn: true,
                        signUpError: false,
                    });
                } else {
                    this.setState({
                        successfulLogIn: false,
                        signUpError: true,
                        errorMessage: response.message,
                    });
                }
            })
            .catch(error => {
                this.setState({signUpError: error});
                console.error(`Error: ${error}`)
            });
    }

    render() {
        // Display error message
        let errorMessageComponent = '';
        if (this.state.signUpError) {
            errorMessageComponent = <p>{this.state.errorMessage}</p>
        } else {
            errorMessageComponent = '';
        }
        // Redirect login
        if (this.state.successfulLogIn) {
            return <Redirect to='/' />
        }
        return(
            <div>
                <Row>
                    <div>
                        <Col s={4}></Col>
                        <Col s={4}><h5>Sign Up</h5></Col>
                        <Col s={4}></Col>
                    </div>
                </Row>
                {errorMessageComponent}
                <form className='signUpForm'
                    onSubmit={ e=> {
                        e.preventDefault();
                        this.handleSubmit();
                    }}>
                    <Row>
                        <Col s={4}></Col>
                        <Input placeholder='Username' s={4} label='Username' onChange={this.handleUsernameChange}><Icon medium>person</Icon></Input>
                        <Col s={4}></Col>
                    </Row>
                    <Row>
                        <Col s={4}></Col>
                        <Input type='password' label="Password" s={4} onChange={this.handlePasswordChange}><Icon medium>lock</Icon></Input>
                        <Col s={4}></Col>
                    </Row>
                        <center><Button waves='light'>Submit</Button></center>
                </form>

            </div>
        )
    }
}