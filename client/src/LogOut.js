import React from 'react';
import { Redirect } from 'react-router-dom';

export default class LogOut extends React.Component {
    componentDidMount() {
        fetch('/logout')
    }

    render() {
        return(
            <Redirect to='/' />
        )
    }
}

