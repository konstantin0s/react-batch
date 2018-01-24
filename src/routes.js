// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  // Lobby,
  Classroom,
  Student,
  SignIn,
  SignUp

} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
// 
// <Route exact path="/" component={Lobby} />
// <Route path="/play/:classroomId" component={classroom} />
