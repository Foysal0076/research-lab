import axios from "axios"
import { FACULTY_DETAILS_FAIL, FACULTY_DETAILS_REQUEST, FACULTY_DETAILS_SUCCESS, FACULTY_FAIL, FACULTY_PROFILE_FAIL, FACULTY_PROFILE_REQUEST, FACULTY_PROFILE_SUCCESS, FACULTY_REQUEST, FACULTY_SUCCESS, FACULTY_PROFILE_CREATE_REQUEST, FACULTY_PROFILE_CREATE_SUCCESS, FACULTY_PROFILE_CREATE_FAIL, FACULTY_PROFILE_EDIT_REQUEST, FACULTY_PROFILE_EDIT_SUCCESS, FACULTY_PROFILE_EDIT_FAIL } from "./types"


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

export const getFacultyDetails = (memberId) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/members/${memberId}`)

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

export const getFacultyProfileByUserId = (userId) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_PROFILE_REQUEST })
        if (userId) {
            const { data } = await axios.get(`/api/members/byuserid/${userId}`)
            dispatch({
                type: FACULTY_PROFILE_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: FACULTY_PROFILE_FAIL,
                payload: 'Please request with a valid user id'
            })
        }

    } catch (error) {
        dispatch({
            type: FACULTY_PROFILE_FAIL,
            payload: error.response.data.message || error.response && error.response.data.message && error.response.data.message
        })
    }

}

export const createFacultyProfile = (profile, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FACULTY_PROFILE_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/members/${id}`, profile, config)

        dispatch({
            type: FACULTY_PROFILE_CREATE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: FACULTY_PROFILE_CREATE_FAIL,
            payload: error.response.data.message || error.response && error.response.data.message && error.response.data.message
        })
    }

}

export const editFacultyProfile = (profile, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FACULTY_PROFILE_EDIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/members/${id}/edit`, profile, config)

        dispatch({
            type: FACULTY_PROFILE_EDIT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FACULTY_PROFILE_EDIT_FAIL,
            payload: error.response.data.message || error.response && error.response.data.message && error.response.data.message
        })
    }

}
