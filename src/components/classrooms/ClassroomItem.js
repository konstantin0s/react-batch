import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ClassroomItem extends PureComponent {
  static propTypes ={
    batchNr: PropTypes.string.isRequired,
    students: PropTypes.array,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired
  }


  // <h3> List of students:  { students.length } </h3>

  render () {
    const { _id, batchNr, students, startAt, endAt } = this.props


    return(
      <article className="Classroom">
        <h1><Link to={`/classrooms/${_id}`}>Classroom { batchNr }</Link> </h1>
        <div>
          <h4> Start date:  { startAt } </h4>
          <h4> End date:  { endAt } </h4>
        </div>
      </article>
    )
  }
}

export default ClassroomItem
