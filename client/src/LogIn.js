import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Row, Input, Icon, Button, Card, Col } from 'react-materialize'
import AuthService from './AuthService.js';

import './Login.css';

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            successfulLogIn: false,
            logInError: false,
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
            redirect: 'follow',
        };
        fetch('/api/v1/login', requestOptions)
            .then(response => { 
                console.log(response)
                if (response.status === 200) {
                    AuthService.authenticate(() => {
                        this.setState({ successfulLogIn: true });
                        console.log("Successful sign in");
                    });
                } else if (response.status === 401) {
                    console.log(response);
                    this.setState({
                        logInError: true,
                        errorMessage: "Incorrect Password"
                    });
                }
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                this.setState({logInError: true});
            });
    }

    render() {
        // Display error message
        let errorMessageComponent = '';
        if (this.state.logInError) {
            errorMessageComponent = <p>{this.state.errorMessage}</p>
        } else {
            errorMessageComponent = '';
        }

        const { from } = this.props.location.state || { from: { pathname: "/" } };

        // Redirect login
        if (this.state.successfulLogIn) {
            return <Redirect to={from} />
        }

        return(
            <div>
                
                <form className='logInForm'
                    onSubmit={ e=> {
                        e.preventDefault();
                        this.handleSubmit();
                    }}>

                    <Row>
                        <div className="vert-wrapper">
                            <div className="pad"></div>
                            <div>
                                <Col s={4}></Col>
                                <Col s={4}><h5>LOG IN</h5></Col>
                                <Col s={4}></Col>
                            </div>
                            {errorMessageComponent}
                            <div>
                                <Col s={4}></Col>
                                <Input placeholder='Username' s={4} label='Username' onChange={this.handleUsernameChange}><Icon medium>person</Icon></Input>
                                <Col s={4}></Col>
                            </div>
                            <div>
                                <Col s={4}></Col>
                                <Input type='password' label="Password" s={4} onChange={this.handlePasswordChange}><Icon medium>lock</Icon></Input>
                                <Col s={4}></Col>
                            </div>
                            <div className="pad"></div>
                            <center><div><Button waves='light'>Submit</Button></div></center>
                        </div>
                    </Row>
                </form>
                <Row>
                    <Col s={4}></Col>
                    <Col s={4}><p>Don't have a login? <Link to='/signup'>Sign Up</Link></p></Col>
                    <Col s={4}></Col>
                </Row>
                <div className="box"></div>
            
                    <div className="container">
                        <div className="vert-wrapper">
                        <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>SAVE ARTICLES</h5>
                            <div className="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                        <div className="vert-wrapper">
                        <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>ANALYSE</h5>
                            <div className="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                        <div className="vert-wrapper">
                            <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>SET GOALS</h5>
                            <div className="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                    </div>

            </div>            
        )
    }
}