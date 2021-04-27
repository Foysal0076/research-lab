import axios from "axios"
import { FACULTY_DETAILS_FAIL, FACULTY_DETAILS_REQUEST, FACULTY_DETAILS_SUCCESS, FACULTY_FAIL, FACULTY_REQUEST, FACULTY_SUCCESS } from "./types"


export const getFacultyList = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: FACULTY_REQUEST })

    const { data } = await axios.get(`/api/members?keyword=${keyword}`)

    dispatch({
      type: FACULTY_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: FACULTY_FAIL,
      payload: error.respons && error.response.data.message ? error.response.data.message : error.message
    })
  }

}

export const getFacultyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FACULTY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/members/${id}`)

    dispatch({
      type: FACULTY_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: FACULTY_DETAILS_FAIL,
      payload: error.respons && error.response.data.message ? error.response.data.message : error.message
    })
  }

}