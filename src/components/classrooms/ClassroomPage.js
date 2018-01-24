import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchClassroomById } from '../actions/classrooms'
import Title from '../components/Title'

export class ClassroomPage extends PureComponent {
  // static propTypes = {
  //   title: PropTypes.string,
  // }

  componentWillMount() {
    this.props.dispatch(fetchClassroomById())
  }

  render() {
    const { batchNo } = this.props

    if (!batchNo) return null

    return (
      <div className="classroom page">
        <Title content={batchNo} />
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
