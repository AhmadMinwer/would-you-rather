import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect , Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Login from './Login';
import Leaderboard from './Leaderboard';
import {fakeAuth} from './fakeAuth'
import NotFound from './NotFound'




class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {


    // 

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )} />
    )

    // 
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Switch>
                <PrivateRoute path='/' exact component={Dashboard} />
                <PrivateRoute path='/questions/:id' component={QuestionPage} />
                <PrivateRoute path='/add' component={NewQuestion} />
                <PrivateRoute path='/leaderboard' component={Leaderboard} />

                <Route path='/login' component={Login} />
                <Route component={NotFound} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}


export default connect()(App);
