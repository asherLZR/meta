import React from 'react';
import GoalsItem from './components/GoalsItem';
import GoalsForm from './components/GoalsForm';
import { Collection, CollectionItem, Row, Col } from 'react-materialize';

class Goals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: {
                "book" : 10,
                "sport" : 20,
                "study" : 30
            }
        };
    };

    renderList = () => {
        return Object.keys(this.state.goals).map(goal => 
        <CollectionItem>
        <GoalsItem 
            category={goal}
            amount={this.state.goals[goal]}
        />
        </CollectionItem>
        )
    }

    onTermSubmit = term => {
        let newState = this.state.goals;
        newState[term] = 0
        this.setState(newState);
    }

    render(){
        return (
            <div>
                <Row>
                    <Col s={4}></Col>
                    <Col s={4}><GoalsForm onFormSubmit={this.onTermSubmit}/></Col>
                    <Col s={4}></Col>
                </Row>
                <Row>
                    <Col s={4}></Col>
                    <Col s={4}><Collection>{this.renderList()}</Collection></Col>
                    <Col s={4}></Col>
                </Row>
            </div>
        )
    }
}

export default Goals;