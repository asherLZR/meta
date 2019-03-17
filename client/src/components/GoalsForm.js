import React from 'react';
import { Input } from 'react-materialize';

class GoalsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term : "" }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (event) => {
        this.setState({ term : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);
        this.setState({ term : "" });
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <Input 
                    placeholder="e.g. tech" 
                    type="text" 
                    value={this.state.term} 
                    onChange={this.handleChange}
                    label="Artical category: "
                />
                <Input background="#26a69a" type="submit" value="Add" />
            </form>
            </div>
        )
    }
}

export default GoalsForm;