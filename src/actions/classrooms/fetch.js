// src/actions/CLASSROOMs/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { CLASSROOM_STUDENTS_UPDATED } from './subscribe'

export const FETCHED_CLASSROOMS = 'FETCHED_CLASSROOMS'
export const FETCHED_ONE_CLASSROOM = 'FETCHED_ONE_CLASSROOM'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/classrooms')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_CLASSROOMS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchStudents = (classroom) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/classrooms/${classroom._id}/students`)
      .then((resultclassrooms) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: CLASSROOM_STUDENTS_UPDATED,
          payload: {
            FETCHED_CLASSROOMS,
            // students: result.body
          }
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOneClassroom = (classroomId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/classrooms/${classroomId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_CLASSROOM,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
