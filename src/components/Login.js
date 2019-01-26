import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setAuthedUser, logout } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { fakeAuth } from './fakeAuth'
import { withRouter } from "react-router-dom";

class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    componentDidMount() {
            this.props.dispatch(logout())
            fakeAuth.signout()
    }

    handleLogin = (value) => {
        this.props.dispatch(setAuthedUser(value.value))
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
        
    }



    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <Dropdown
                    className='new-question'
                    options={Object.values(this.props.users).map(user => {
                        return {
                            value: user.id,
                            label: user.name
                        }
                    })}
                    onChange={this.handleLogin}
                    placeholder="Select an option"
                />
            </div>
        )
    }

}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    };
}

export default withRouter(connect(mapStateToProps)(Login))