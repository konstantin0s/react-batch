import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import { createClassroom } from '../../actions/classrooms/create'
import './ClassroomEditor.sass'
import Title from '../../components/UI/Title'


class ClassroomEditor extends PureComponent {
  constructor(props) {
    super()

    const { _id, batchNr, startAt, endAt } = props

    this.state = {
      batchNr,
      startAt,
      endAt
    }
  }

  updateClassroomNr(number, medium) {
    this.setState({
      batchNr: number
    })
  }

  updateStartAt(date, medium) {
    this.setState({
      startAt: date
    })
  }

  updateEndsAt(date, medium) {
    this.setState({
      endAt: date
    })
  }


  setType(event) {
    this.setState({
      batchNr: this.refs.batchNr.value,
      startAt: this.refs.startAt.value,
      endAt: this.refs.endAt.value

    })
  }

  saveClassroom() {
    const { batchNr, startAt, endAt } = this.state
    const classroom = { batchNr, startAt, endAt }
    console.table(this.state)

    console.table(classroom)

    this.props.save(classroom)
  }

  render() {
    return (
      <div className="editor">
      <h4><Title content="Add New Classroom" /></h4>
      <label> Classrom Nr:
        <input
          type="number"
          ref="classroomNumber"
          className="classroomNumber"
          placeholder="Add classroom number"
          defaultValue={this.state.batchNr}
          />
      </label>
      <br />
      <label> Starts at:
        <input
          type="date"
          ref="startAt"
          className="startAt"
          placeholder="Starting date"
          defaultValue={this.state.startAt}
          />
      </label>
      <br />
      <label> Ends at:
        <input
          type="date"
          ref="endAt"
          className="endAt"
          placeholder="Ending date"
          defaultValue={this.state.endAt}
        />
      </label>
      <br />
        <div className="actions">
          <button className="primary" onClick={this.saveClassroom.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createClassroom }

export default connect(null, mapDispatchToProps)(ClassroomEditor)
