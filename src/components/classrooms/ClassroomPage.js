import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneClassroom } from '../actions/classrooms'
import Title from '../components/Title'

export class ClassroomPage extends PureComponent {
  static propTypes = {
    fetch: PropTypes.string,
  }

  componentWillMount() {
    this.props.dispatch(fetchClassroomById())
  }

  render() {
    const { batchNr } = this.props

    if (!batchNr) return null

    return (
      <div className="classroom page">
        <Title content={ batchNr } />
      </div>
    )
  }
}

const mapStateToProps = ({ classrooms }, { match }) => {
  const classroom = classrooms.reduce((prev, next) => {
    if (next._id === match.params.classroomId) {
      return next
    }
    return prev
  }, {})

  return {
    ...classroom
  }
}

export default connect(mapStateToProps, { fetchClassroomById  })(ClassroomPage)
