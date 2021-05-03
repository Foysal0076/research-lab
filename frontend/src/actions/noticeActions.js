import axios from "axios"
import { NOTICE_CREATE_FAIL, NOTICE_CREATE_REQUEST, NOTICE_CREATE_SUCCESS, NOTICE_DELETE_FAIL, NOTICE_DELETE_REQUEST, NOTICE_DELETE_SUCCESS, NOTICE_EDIT_FAIL, NOTICE_EDIT_REQUEST, NOTICE_EDIT_SUCCESS, NOTICE_FAIL, NOTICE_REQUEST, NOTICE_SUCCESS } from "./types"


export const getNotices = () => async (dispatch) => {
    try {
        dispatch({ type: NOTICE_REQUEST })

        const { data } = await axios.get('/api/notices')

        dispatch({
            type: NOTICE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOTICE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createNotice = (title, body, footnote) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTICE_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post('/api/notices', { title, body, footnote }, config)

        dispatch({
            type: NOTICE_CREATE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: NOTICE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const editNotice = (id, title, body, footnote) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTICE_EDIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/notices/${id}`, { title, body, footnote }, config)

        dispatch({
            type: NOTICE_EDIT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: NOTICE_EDIT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteNotice = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTICE_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/notices/${id}`, config)

        dispatch({
            type: NOTICE_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: NOTICE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}