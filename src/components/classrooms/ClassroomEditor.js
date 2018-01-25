//
//
//
// import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
// import { connect } from 'react-redux'
// import 'medium-editor/dist/css/medium-editor.css'
// import 'medium-editor/dist/css/themes/default.css'
// import { createClassroom } from '../../actions/classrooms/create'
// import './ClassroomEditor.sass'
// import Title from '../../components/UI/Title'
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
// import DatePicker from "material-ui/DatePicker";
// import NewIcon from "material-ui/svg-icons/content/add";
// import PropTypes from 'prop-types'
//
// class ClassroomEditor extends PureComponent {
//   constructor(props) {
//     super()
//
//     const { _id, batchNr, startAt, endAt } = props
//
//     this.state = {
//
//       batchNr,
//       startAt,
//       endAt
//     }
//   }
//
//   updateClassroomNr(number, medium) {
//     this.setState({
//       batchNr: number
//     })
//   }
//
//   updateStartAt(date, medium) {
//     this.setState({
//       startAt: date
//     })
//   }
//
//   updateEndsAt(date, medium) {
//     this.setState({
//       endAt: date
//     })
//   }
//
//
//   setType(event) {
//     this.setState({
//       batchNr: this.refs.batchNr.value,
//       startAt: this.refs.startAt.value,
//       endAt: this.refs.endAt.value
//
//     })
//   }
//
//   validate(classroom) {
//      const { batchNr } = classroom;
//
//      let errors = {};
//      if (!batchNr || batchNr === "")
//        errors.batchNr = "Please type in batch number!";
//
//      this.setState({
//        errors
//      });
//      return Object.keys(errors).length === 0;
//    }
//
//    saveClassroom() {
//      const { batchNr, startAt, endAt } = this.state;
//
//      const classroom = { batchNr, startAt, endAt };
//
//      if (this.validate(classroom)) {
//        this.props.createClassroom(classroom);
//      }
//    }
//
//      render() {
//        return (
//          <div className="editor">
//          <h4><Title content="Add New Classroom" /></h4>
//          <label> Classrom Nr:
//            <input
//              type="number"
//              ref="classroomNumber"
//              className="classroomNumber"
//              placeholder="Add Classroom Number"
//              defaultValue={this.state.batchNr}
//              />
//          </label>
//          <br />
//          <label> Starts at:
//            <input
//              type="date"
//              ref="startAt"
//              className="startAt"
//              placeholder="Starting date"
//              defaultValue={this.state.startAt}
//              />
//          </label>
//          <br />
//          <label> Ends at:
//            <input
//              type="date"
//              ref="endAt"
//              className="endAt"
//              placeholder="Ending date"
//              defaultValue={this.state.endAt}
//            />
//          </label>
//          <br />
//            <div className="actions">
//              <button className="primary" onClick={this.saveClassroom.bind(this)}>Save</button>
//            </div>
//          </div>
//        )
//      }
//    }
//
//    const mapDispatchToProps = { save: createClassroom }
//
//    export default connect(null, mapDispatchToProps)(ClassroomEditor)


import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createClassroom } from '../../actions/classrooms/create'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'

class ClassroomEditor extends PureComponent {
  constructor(props){
    super()

    const  {batchNr, startAt, endAt} = props

    this.state ={batchNr,startAt,endAt}
  }

  updateBatchNr(event){
    this.setState({
      batchNr: this.refs.batchNr.getValue()
    })
  }

  updateStartDate(event,date){
    this.setState({
      startAt: this.refs.startAt.state.date
    })

  }

  updateEndDate(event){
    this.setState({
      endAt: this.refs.endAt.state.date
    })
  }

  saveClassroom(event) {
    const {batchNr,startAt,endAt} = this.state
    const classroom = ({
      batchNr,
      students: [],
      startAt: startAt.toLocaleDateString(),
      endAt: endAt.toLocaleDateString()
    })

    this.props.createClassroom(classroom)
  }

  render(){
    return (
      <div className='classroom editor'>


          <TextField
            type='text'
            ref='batchNr'
            className='batchNr'
            name = 'Classroomnumber'
            placeholder='Classroom number'
            id="text-field-controlled"
            value={this.state.value}
            onChange={this.updateBatchNr.bind(this)}
            onTouchTap={this.updateBatchNr.bind(this)}/>


          <DatePicker
            ref='startAt'
            className='startAt'
            hintText='Start Date'
            container="inline"
            autoOk = {true}
            defaultDate={this.state.startAt}
            onChange={this.updateStartDate.bind(this)}
            onTouchTap={this.updateStartDate.bind(this)}/>

          <DatePicker
            ref='endAt'
            className='endAt'
            hintText='End Date'
            container="inline"
            autoOk = {true}
            defaultDate={this.state.endAt}
            onChange={this.updateEndDate.bind(this)}
            onTouchTap={this.updateEndDate.bind(this)}/>




        <div className="actions">
          <button className="primary" onClick={this.saveClassroom.bind(this)}>Save</button>
        </div>
      </div>


    )
  }
}
export default connect(null, { createClassroom })(ClassroomEditor)
