import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUserAPICall, userRegistrationAPICall } from './redux/users/userActions'

function UsersContainer ({ userData, loginUserAPICall, userRegistrationAPICall }) {
  const obj={
    userName: "ABCDEFFG",
    password: "Year@2022",
    firstName: "rishabh",
    lastName: "goyal",
    phoneNumber: 34095345834
  }
  useEffect(() => {
  userRegistrationAPICall(obj)
  }, [])
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? ( 
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>Users List</h2>
      <div>
        {userData &&
          userData.users &&
          userData.users.map(user => <p>{user.name}</p>)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    userData: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUserAPICall: () => dispatch(loginUserAPICall()),
    userRegistrationAPICall:(obj)=>dispatch(userRegistrationAPICall(obj))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)