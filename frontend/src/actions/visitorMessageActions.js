import axios from "axios"
import { VISITOR_MESSAGE_DELETE_FAIL, VISITOR_MESSAGE_DELETE_REQUEST, VISITOR_MESSAGE_DELETE_SUCCESS, VISITOR_MESSAGE_LIST_FAIL, VISITOR_MESSAGE_LIST_REQUEST, VISITOR_MESSAGE_LIST_SUCCESS, VISITOR_MESSAGE_SEND_FAIL, VISITOR_MESSAGE_SEND_REQUEST, VISITOR_MESSAGE_SEND_SUCCESS } from "./types"

export const sendVisitorMessage = (name, email, message) => async (dispatch) => {
    try {
        dispatch({ type: VISITOR_MESSAGE_SEND_REQUEST })

        const { data } = await axios.post('/api/visitormessages', { name, email, message })
        if (data) {
            dispatch({
                type: VISITOR_MESSAGE_SEND_SUCCESS
            })
        }

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: VISITOR_MESSAGE_SEND_FAIL,
            payload: message,
        })
    }
}

export const getVisitorMessages = () => async (dispatch, getState) => {
    try {
        dispatch({ type: VISITOR_MESSAGE_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/visitormessages', config)

        if (data) {
            dispatch({
                type: VISITOR_MESSAGE_LIST_SUCCESS,
                payload: data
            })
        }

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: VISITOR_MESSAGE_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteVisitorMessage = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: VISITOR_MESSAGE_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/visitormessages/${id}`, config)
        if (data) {
            dispatch({
                type: VISITOR_MESSAGE_DELETE_SUCCESS
            })
        }

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: VISITOR_MESSAGE_DELETE_FAIL,
            payload: message,
        })
    }
}