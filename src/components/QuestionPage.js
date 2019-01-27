import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions'
import { RadioGroup, RadioButton } from 'react-radio-buttons';




class QuestionPage extends Component {

    isAnswered = function () {
        const { authedUser, users } = this.props
        const questionId = this.props.id
        const authedUserObject = users[authedUser]

        return Object.keys(authedUserObject.answers).filter(id => id === questionId)

    }

    handleAnswer = (value) => {
        const { dispatch, id, authedUser } = this.props

        dispatch(handleAnswerQuestion({
            id: id,
            answer: value,
            authedUser
        }))
    }



    render() {
        const { question, users, authedUser, id } = this.props;
        // const id = this.props.match.params['id']
        // const question = questions[id]
        // const users = this.props.users
        if (!question) {
            return <Redirect to='/notfound' />
        }
        const authedUserObject = users[authedUser]
        const numOfOptionOneVotes = question.optionOne.votes.length
        const numOfOptionTwoVotes = question.optionTwo.votes.length
        const numOfVotes = numOfOptionOneVotes + numOfOptionTwoVotes
        return (
            <div className="question cursor-pointer">
                <img
                    src={users[question.author].avatarURL ? users[question.author].avatarURL : 'https://oshinon.com/wp-content/uploads/2018/12/man.png'}
                    alt={`Avatar of ${users[question.author].name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <div>
                        <span>{users[question.author].name}</span>
                    </div>
                    <span className='center m-b-25'>Would You Rather...</span>
                    {this.isAnswered().length <= 0 ?
                        <RadioGroup onChange={this.handleAnswer} vertical="true">
                            <RadioButton value='optionOne' className='radio-btn'>
                                {question.optionOne.text}
                            </RadioButton>
                            <RadioButton value="optionTwo" className='radio-btn'>
                                {question.optionTwo.text}
                            </RadioButton>
                        </RadioGroup>
                        : <div>
                            <div className={authedUserObject.answers[id] === 'optionOne' ? 'bg-green padding' : 'border-1 padding'}>
                                <p>{question.optionOne.text}</p>
                                <h6 className='margin-2'>{numOfOptionOneVotes + 'votes'}</h6>
                                <h6 className='margin-2'>{Math.round(numOfOptionOneVotes / numOfVotes * 100) + '% of people chosed this answer'} </h6>
                            </div>
                            <div className={authedUserObject.answers[id] === 'optionTwo' ? 'bg-green padding margin-top' : 'border-1 padding margin-top'}>
                                <p>{question.optionTwo.text}</p>
                                <h6 className='margin-2'>{numOfOptionTwoVotes + 'votes'}</h6>
                                <h6 className='margin-2'>{Math.round(numOfOptionTwoVotes / numOfVotes * 100) + '% of people chosed this answer'} </h6>
                            </div>
                        </div>}


                </div>
            </div>
        );
    }
}


function mapStateToProps({ authedUser, questions, users }, props) {

    const id = props.match.params['id']

    console.log('questions from props', questions)

    const question = questions[id]
    if (question) {
        question['optionOneText'] = question.optionOne.text
        question['optionTwoText'] = question.optionTwo.text
    }
    return {
        id,
        users,
        questions,
        authedUser,
        question

    }
}

export default connect(mapStateToProps)(QuestionPage);
