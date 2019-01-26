import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-dropdown/style.css'

class Leaderboard extends Component {
    render() {

        const { users } = this.props
        const usersArray = Object.values(users)
        const sortedUsers = usersArray.sort((userA, userB) => Object.keys(userA.answers).length + userA.questions.length < Object.keys(userB.answers).length + userB.questions.length ? 1 : -1)
        console.log('sortedUsers', sortedUsers)
        return (
            <div >
                <ul className='dashboard-list'>
                    {sortedUsers.map((user) => (
                        <li key={user.id}>
                            <div className='question'>

                                <img
                                    src={user.avatarURL ? user.avatarURL : 'https://oshinon.com/wp-content/uploads/2018/12/man.png'}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                />
                                <div className='question-info'>
                                    <div>
                                        <span> {user.name}</span>
                                    </div>
                                    <div>
                                        <p>asked {user.questions.length} questions</p>
                                        <p>answered {Object.keys(user.answers).length} questions</p>
                                    </div>
                                </div>

                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}
function mapStateToProps({ users, questions }) {
    return {
        users,
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard)