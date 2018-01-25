import React, { PureComponent } from 'react'
// import Title from '../components/Title'
import ClassroomItem from './ClassroomItem'

class ClassroomContainer extends PureComponent {
  renderClassroom(classroom, index) {
    return (
      <article className="classroom">
        <h1>Classroom number: { classroom.batchNr }</h1>
        <div>
          <ul>
            <li>Starting date: { classroom.startAt  }</li>
            <li>Ending date: { classroom.endAt  }</li>

          </ul>
        </div>
      </article>
    )
  }

  render() {
    return(
      <div className="classroom wrapper">
        <header>
        </header>

        <main>
          { this.props.classrooms.map(this.renderClassroom) }
        </main>
      </div>
    )
  }
}
// <Title content="Classrooms" /> //belongs to header

export default ClassroomContainer
