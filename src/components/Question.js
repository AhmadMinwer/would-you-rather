import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Question extends Component {

  render() {
    const question = this.props.question
    const users = this.props.users
    return (
      <Link to={`/questions/${this.props.id}`} >
        <div className="question">
          <img
            src={users[question.author].avatarURL ? users[question.author].avatarURL : 'https://oshinon.com/wp-content/uploads/2018/12/man.png'}
            alt={`Avatar of ${users[question.author].name}`}
            className='avatar'
          />
          <div className='question-info'>
            <div>
              <span>{users[question.author].name}</span>
            </div>
            <span className='center m-b-25' >Would You Rather...</span>
            <div>
              <p>-{question.optionOne.text}</p>
              <p>-{question.optionTwo.text}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  question['optionOneText'] = question.optionOne.text
  question['optionTwoText'] = question.optionTwo.text

  return {
    id,
    questions,
    authedUser,
    users,
    question

  };
}

export default connect(mapStateToProps)(Question);
