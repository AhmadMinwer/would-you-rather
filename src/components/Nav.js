import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { Component } from 'react';

class Nav extends Component {
  render(){
  return(
    <nav className = 'nav' >
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' activeClassName='active'>
            {this.props.authedUser ? 'Logout '+ this.props.authedUser : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  )}
}


function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Nav);