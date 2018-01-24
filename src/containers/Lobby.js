// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClassrooms from '../actions/classrooms/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateClassroomButton from '../components/classrooms/CreateClassroomButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchClassroomIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinClassroomIcon from 'material-ui/svg-icons/social/person-add'
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchClassrooms()
    this.props.subscribeToWebsocket()
  }

  goToClassroom = classroomId => event => this.props.push(`/play/${classroomId}`)

  isJoinable(classroom) {
    return !classroom.studentOneId || !classroom.studentTwoId
  }

  isStudent(classroom) {
    if (!this.props.currentUser) { return false }
    return classroom.studentOneId === this.props.currentUser._id ||
      classroom.studentTwoId === this.props.currentUser._id
  }

  isPlayable(classroom) {
    return this.isStudent(classroom) && !this.isJoinable(classroom)
  }

  renderClassroom = (classroom, index) => {
    let ActionIcon = this.isJoinable(classroom) ? JoinClassroomIcon : WatchClassroomIcon
    if (this.isStudent(classroom)) ActionIcon = this.isPlayable(classroom) ? JoinClassroomIcon  : WaitingIcon

    if (!classroom.studentOne) { this.props.fetchStudents(classroom) }

    const title = [classroom.studentOne, classroom.studentTwo]
      .filter(n => !!n)
      .map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <MenuItem
        key={index}
        onClick={this.goToClassroom(classroom._id)}
        rightIcon={<ActionIcon />}
        primaryText={title} />
    )
  }
  // {this.props.classrooms.map(this.renderClassroom)} //this should go below, into the Menu tag

  render() {
    return (
      <div className="Lobby">
        <h1>Classrooms!</h1>
        <CreateClassroomButton />
        <Paper className="paper">
          <Menu>
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classrooms, currentUser }) => ({ classrooms, currentUser })

export default connect(mapStateToProps, { fetchClassrooms, subscribeToWebsocket, push })(Lobby)
