import React from 'react';

import { Row, Input, Icon, Button, Card, Col } from 'react-materialize'
import './Login.css';

export default class LogIn extends React.Component {
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
        fetch('/api/v1/login', requestOptions)
            .then(res => res.json())
            .then(response => { console.log(JSON.stringify(response))})
            .catch(error => console.error(`Error: ${error}`));
    }

    render() {
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

                <div className="box"></div>
            
                    <div className="container">
                        <div className="vert-wrapper">
                        <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>SAVE ARTICLES</h5>
                            <div class="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                        <div className="vert-wrapper">
                        <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>ANALYSE</h5>
                            <div class="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                        <div className="vert-wrapper">
                            <center><img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="W3Schools.com"></img>
                            <h5>SET GOALS</h5>
                            <div class="b">hello my name is bob and this is some cool text</div>
                            </center>
                        </div>
                    </div>

            </div>            
        )
    }
}