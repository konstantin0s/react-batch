import API from '../../api/client'
import { push } from 'react-router-redux'
import { fetchOneClassroom } from '../classrooms/fetch'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const QUESTION_ME = 'QUESTION_ME'

const api = new API()

export default (classroom) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

api.put(`/classrooms/${classroom._id}`, classroom)
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch (fetchOneClassroom(classroom._id))
      dispatch(push(`/students/${result.body._id}`))
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
