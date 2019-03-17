import React from 'react';
import { Button, Row, Col } from 'react-materialize'


class GoalsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category : props.category,
            amount : props.amount
        };
    };

    increment = () => {
        this.setState({
            category : this.state.category,
            amount : this.state.amount + 1
        });
    }

    decrement = () => {
        this.setState({
            category : this.state.category,
            amount : Math.max(this.state.amount - 1, 0)
        });
    }

    render(){
        return (
            <div>
                <div><Row>
                    <Col><h5 style={{display:"inline"}}> {this.state.category}  </h5></Col>
                    <Col>
                    <Button style={{padding: "10px", textAlign : "center"}} onClick = {this.decrement}> - </Button> 
                    <h5 style={{display:"inline"}}> {this.state.amount}  </h5>
                    <Button style={{padding: "10px"}} onClick = {this.increment}> + </Button> 
                    </Col>
                </Row></div>
            </div>
        )
    }
}

export default GoalsItem;