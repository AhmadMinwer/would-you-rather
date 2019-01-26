
import { connect } from 'react-redux'
import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className='center'>
                <h1>404</h1>
                <h2>page not found</h2>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users
    };
}

export default connect(mapStateToProps)(NotFound);