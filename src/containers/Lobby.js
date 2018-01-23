// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClassrooms, { fetchStudents } from '../actions/classrooms/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateClassroomButton from '../components/classrooms/CreateClassroomButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchclassroomIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinclassroomIcon from 'material-ui/svg-icons/social/person-add'
// import PlayclassroomIcon from 'material-ui/svg-icons/hardware/videoclassroom-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchClassrooms()
    this.props.subscribeToWebsocket()
  }

  goToclassroom = classroomId => event => this.props.push(`/play/${classroomId}`)

  isJoinable(classroom) {
    return !classroom.playerOneId || !classroom.playerTwoId
  }

  isPlayer(classroom) {
    if (!this.props.currentUser) { return false }
    return classroom.playerOneId === this.props.currentUser._id ||
      classroom.playerTwoId === this.props.currentUser._id
  }

  isPlayable(classroom) {
    return this.isPlayer(classroom) && !this.isJoinable(classroom)
  }

  // renderclassroom = (classroom, index) => {
  //   let ActionIcon = this.isJoinable(classroom) ? JoinclassroomIcon : WatchclassroomIcon
  //   if (this.isPlayer(classroom)) ActionIcon = this.isPlayable(classroom) ? PlayclassroomIcon : WaitingIcon
  //
  //   if (!classroom.playerOne) { this.props.fetchStudents(classroom) }
  //
  //   const title = [classroom.playerOne, classroom.playerTwo]
  //     .filter(n => !!n)
  //     .map(p => (p.name || null))
  //     .filter(n => !!n)
  //     .join(' vs ')
  //
  //   return (
  //     <MenuItem
  //       key={index}
  //       onClick={this.goToclassroom(classroom._id)}
  //       rightIcon={<ActionIcon />}
  //       primaryText={title} />
  //   )
  // }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateClassroomButton />
        <Paper className="paper">
          <Menu>
            {this.props.classroom.map(this.renderclassroom)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classrooms, currentUser }) => ({ classrooms, currentUser })

export default connect(mapStateToProps, { fetchClassrooms, subscribeToWebsocket, fetchStudents, push })(Lobby)
