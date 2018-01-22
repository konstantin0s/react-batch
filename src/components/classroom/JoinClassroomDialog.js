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
    const { currentUser, open, isPlayer } = this.props

    if (isPlayer) return null

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
  const isPlayer = classroom && currentUserId &&
    (classroom.playerOneId === currentUserId || classroom.playerTwoId === currentUserId)
  const isJoinable = classroom && !isPlayer &&
    (!classroom.playerOneId || !classroom.playerTwoId)

  return {
    classroom,
    currentUser,
    isPlayer,
    open: isJoinable
  }
}

export default connect(mapStateToProps, { joinclassroom })(JoinclassroomDialog)
