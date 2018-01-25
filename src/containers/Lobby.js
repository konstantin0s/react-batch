// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClassrooms from '../actions/classrooms/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateClassroomButton from '../components/classrooms/CreateClassroomButton'
import { fetchOneClassroom } from '../../actions/classrooms/fetch'
import fetchStudents from '../../actions/classrooms/fetch'
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
    this.props.fetchStudents()
  }

  fechClassroom(id){
    this.props.push(`/classroom/${id}`)
    this.props.fetchOneClassroom(id)
  }

  render() {
    return(
      <div className="Lobby">
         <h1>Classrooms</h1>
           <CreateClassroomButton />
             <Paper className="paper">
               <Menu>
                  { this.props.batches.map((classroom,index) => <h3 className="box" key={ index } onClick={this.fetchClassroom.bind(this, classroom._id)} > #{ classroom.batchNumber } <p className="dates">Runs from {classroom.startAt.substring(8, 10) + - + classroom.startAt.substring(5, 7)} until {classroom.endAt.substring(8, 10) + - +  classroom.endAt.substring(5, 7)}</p></h3>) }
               </Menu>
             </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classrooms, currentUser }) => ({ classrooms, currentUser })

export default connect(mapStateToProps, { fetchClassrooms, subscribeToWebsocket, push })(Lobby)
