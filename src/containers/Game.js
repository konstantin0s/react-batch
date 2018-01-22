import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneclassroom, fetchstudents } from '../actions/classrooms/fetch'
import patchclassroom from '../actions/classrooms/patch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinclassroomDialog from '../components/classrooms/JoinclassroomDialog'
import Square from '../components/classrooms/Square'

const studentshape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string
})

const squareStyles = { display: 'flex', flexFlow: 'row wrap', width: 305, height: 305, margin: '100px auto'}

class classroom extends PureComponent {
  static propTypes = {
    fetchOneclassroom: PropTypes.func.isRequired,
    fetchstudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    patchclassroom: PropTypes.func.isRequired,
    classroom: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      board: PropTypes.arrayOf(PropTypes.string),
      userId: PropTypes.string.isRequired,
      playerOneId: PropTypes.string,
      playerOne: studentshape,
      playerTwoId: PropTypes.string,
      playerTwo: studentshape,
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
    turn: PropTypes.number.isRequired,
    started: PropTypes.bool,
    isPlayer: studentshape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {
    const { classroom, fetchOneclassroom, subscribeToWebsocket } = this.props
    const { classroomId } = this.props.match.params

    if (!classroom) { fetchOneclassroom(classroomId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { classroom } = nextProps

    if (classroom && !classroom.playerOne) {
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

    const title = [classroom.playerOne, classroom.playerTwo]
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

        <JoinclassroomDialog classroomId={classroom._id} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classrooms }, { match }) => {
  const classroom = classrooms.filter((g) => (g._id === match.params.classroomId))[0]
  const currentUserId = currentUser && currentUser._id
  const squaresFilled = (classroom && classroom.board.filter(s => !!s).length) || 0
  const started = squaresFilled > 0
  const isPlayer = classroom && currentUserId &&
    (classroom.playerOneId === currentUserId || classroom.playerTwoId === currentUserId)
  const turn = squaresFilled % 2
  const hasTurn = isPlayer &&
    (turn === 0 && classroom.playerOneId === currentUserId) ||
    (turn === 1 && classroom.playerTwoId === currentUserId)
  const isJoinable = classroom && !isPlayer &&
    (!classroom.playerOneId || !classroom.playerTwoId)

  return {
    isPlayer,
    classroom,
    isPlayer,
    hasTurn,
    isJoinable,
    squaresFilled
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneclassroom,
  fetchstudents,
  patchclassroom
})(classroom)
