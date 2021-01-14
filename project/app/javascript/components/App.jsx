import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Routes from "../routes/Index";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
    componentDidMount() {
        this.loginStatus()
    }
    loginStatus = () => {
        axios.get('http://localhost:3001/logged_in',
            { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    this.handleLogin(response)
                } else {
                    this.handleLogout()
                }
            })
            .catch(error => console.log('api errors:', error))
    }
    handleLogin = (data) => {
        this.setState({
            isLoggedIn: true,
            user: data.user
        })
    }
    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            user: {}
        })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
export default props => <>{Routes}</>;;