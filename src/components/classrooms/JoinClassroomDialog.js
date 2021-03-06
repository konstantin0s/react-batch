import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import joinclassroom from '../../actions/classrooms/join'

class JoinclassroomDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }

  joinclassroom = () => {
    const { joinclassroom, classroom } = this.props
    joinclassroom(classroom)
  }

  render() {
    const { currentUser, open, isStudent } = this.props

    if (isStudent) return null

    const actions = [
      <Link to="/">
        <FlatButton
          label="No Thanks"
          primary={true} />
      </Link>,
      <RaisedButton
        label="Join classroom"
        primary={true}
        keyboardFocused={true}
        onClick={this.joinclassroom}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Join classroom"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
          Hey <strong>{currentUser.name || 'there'}!</strong> Would you like to join this classroom?
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classrooms }, { classroomId }) => {
  const currentUserId = currentUser && currentUser._id
  const classroom = classrooms.filter((g) => (g._id === classroomId))[0]
  const isStudent = classroom && currentUserId &&
    (classroom.studentOneId === currentUserId || classroom.studentTwoId === currentUserId)
  const isJoinable = classroom && !isStudent &&
    (!classroom.studentOneId || !classroom.studentTwoId)

  return {
    classroom,
    currentUser,
    isStudent,
    open: isJoinable
  }
}

export default connect(mapStateToProps, { joinclassroom })(JoinclassroomDialog)
