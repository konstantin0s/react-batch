// src/actions/classrooms/create.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const CLASSROOM_CREATED = 'CLASSROOM_CREATED'

export const createClassroom = (newClassroom) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/classrooms', newClassroom)
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
