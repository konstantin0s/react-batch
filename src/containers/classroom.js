import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchClassrooms, fetchOneClassroom } from '../actions/classrooms/fetch'
import patchClassroom from '../actions/classrooms/patch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinClassroomDialog from '../components/classrooms/JoinClassroomDialog'
import Square from '../components/classrooms/Square'

const studentshape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string
})

const squareStyles = { display: 'flex', flexFlow: 'row wrap', width: 305, height: 305, margin: '100px auto'}

class classroom extends PureComponent {
  static propTypes = {
    fetchEvaluations: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    fetchOneClassroom: PropTypes.func.isRequired,
    fetchClassroomStudents: PropTypes.func.isRequired,
    fetchOneStudent : PropTypes.func.isRequired


  }

  componentWillMount() {
    const { classroom, fetchOneclassroom, subscribeToWebsocket } = this.props
    const { classroomId } = this.props.match.params

    if (!classroom) { fetchOneclassroom(classroomId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { classroom } = nextProps

    if (classroom && !classroom.studentOne) {
      this.props.fetchstudents(classroom)
    }
  }

  claimSquare = index => () => {
    this.props.patchclassroom(this.props.classroom._id, { claim: index })
  }

  renderSquares = () => {
    const { classroom } = this.props
    return classroom.board.map((s,i) => (
      <Square
        onClick={this.claimSquare(i)}
        value={s}
        key={i}
      />
    ))
  }

  render() {
    console.log(this.props)
    const { classroom, hasTurn } = this.props

    if (!classroom) return null

    const title = [classroom.studentOne, classroom.studentTwo]
      .filter(n => !!n)
      .map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <div className="classroom">
        <h1>classroom!</h1>
        <p>{title}</p>

        <div style={{ ...squareStyles, cursor: hasTurn ? 'pointer' : 'inherit' }}>
          {this.renderSquares()}
        </div>

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>

        <JoinClassroomDialog classroomId={classroom._id} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classrooms }, { match }) => {
  const classroom = classrooms.filter((g) => (g._id === match.params.classroomId))[0]
  const currentUserId = currentUser && currentUser._id
  const squaresFilled = (classroom && classroom.board.filter(s => !!s).length) || 0
  const started = squaresFilled > 0
  const isStudent = classroom && currentUserId &&
    (classroom.studentOneId === currentUserId || classroom.studentTwoId === currentUserId)
  const turn = squaresFilled % 2
  const hasTurn = isStudent &&
    (turn === 0 && classroom.studentOneId === currentUserId) ||
    (turn === 1 && classroom.studentTwoId === currentUserId)
  const isJoinable = classroom && !isStudent &&
    (!classroom.studentOneId || !classroom.studentTwoId)

  return {
    isStudent,
    classroom,
    isStudent,
    hasTurn,
    isJoinable,
    squaresFilled
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneClassroom,

  patchClassroom,
})(classroom)
