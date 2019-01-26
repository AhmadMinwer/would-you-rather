import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChangeOptionOne = function (e) {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = function (e) {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      text: '',
      toHome: true,
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const { authedUser, users } = this.props
    console.log(authedUser)
    console.log(users)

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='new-question'>
        <h3 className='center'>New Question</h3>
        <div className='center'>
          <img
            src={users[authedUser].avatarURL ? users[authedUser].avatarURL : 'https://oshinon.com/wp-content/uploads/2018/12/man.png'}
            alt={`Avatar of ${users[authedUser].name}`}
            className='avatar'
          />
          <br />
          <span>
            Would You Rather...
          </span>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div>
              <textarea
                placeholder='option one'
                value={optionOne}
                onChange={(e) => this.handleChangeOptionOne(e)}
              />
            </div>
            <div >
              <textarea
                placeholder='option two'
                value={optionTwo}
                onChange={(e) => this.handleChangeOptionTwo(e)}
              />
            </div>
            <button

              type='submit'
              disabled={optionOne === '' || optionTwo === ''}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(NewQuestion)
