import axios from "axios"
import { VISITOR_MESSAGE_SEND_FAIL, VISITOR_MESSAGE_SEND_REQUEST, VISITOR_MESSAGE_SEND_SUCCESS } from "./types"

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