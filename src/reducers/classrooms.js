// src/reducers/CLASSROOMs.js
import { FETCHED_CLASSROOMS, FETCHED_ONE_CLASSROOM } from '../actions/classrooms/fetch'
import {
  CLASSROOM_CREATED,
  CLASSROOM_UPDATED,
  CLASSROOM_REMOVED,
  CLASSROOM_STUDENTS_UPDATED,
} from '../actions/classrooms/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_CLASSROOMS :
      return [ ...payload ]

    case FETCHED_ONE_CLASSROOM :
      const classroomIds = state.map(g => g._id)
      if (classroomIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((classroom) => {
        if (classroom._id === payload._id) {
          return { ...payload }
        }
        return classroom
      })

    case CLASSROOM_CREATED :
      const newClassroom = { ...payload }
      return [newClassroom].concat(state)

    case CLASSROOM_UPDATED :
      return state.map((classroom) => {
        if (classroom._id === payload._id) {
          return { ...payload }
        }
        return classroom
      })

    case CLASSROOM_STUDENTS_UPDATED :  // check this line in the code and see from where is comming and change from students to students
      return state.map((classroom) => {
        if (classroom._id === payload.classroom._id) {
          return {
            ...payload.classroom,
            studentOne: payload.students[0],
            studentTwo: payload.students[1]
          }
        }
        return classroom
      })

    case CLASSROOM_REMOVED :
        return state.filter((classroom) => (classroom._id !== payload._id))

    default :
      return state

  }
}
