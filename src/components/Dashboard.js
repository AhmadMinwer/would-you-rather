import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    state = {
        showAnswered: false,
    }

    handleAnswerdClicked = function () {
        this.setState(function () {
            return {
                showAnswered: true
            }
        })
    }

    handleUnanswerdClicked = function () {
        this.setState(function () {
            return {
                showAnswered: false
            }
        })
    }

    render() {
        const { answerdQuestions, unanswerdQuestions } = this.props;

        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <div className='center'>
                    <button
                        className={this.state.showAnswered ? '' : 'active-btn'}
                        onClick={(event) => this.handleUnanswerdClicked()}>
                        Unanswerd questions
                    </button>
                    <button
                        className={this.state.showAnswered ? 'active-btn' : ''}
                        onClick={(event) => this.handleAnswerdClicked()}>
                        Answerd questions
                    </button>
                </div>

                <ul className='dashboard-list'>
                    {this.state.showAnswered ? answerdQuestions.map((id) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    )) : unanswerdQuestions.map((id) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }) {
   console.log('authedUser..', authedUser)
    const questionsIds = Object.keys(questions)
   console.log('questions', questions)

    const answerdQuestions = questionsIds.filter(id => questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    const unanswerdQuestions = questionsIds.filter(id => !answerdQuestions.includes(id)).sort((a, b) =>questions[b].timestamp - questions[a].timestamp)

    return {
        questionsIds,
        questions,
        authedUser,
        users,
        answerdQuestions,
        unanswerdQuestions,
    }
}

export default connect(mapStateToProps)(Dashboard)