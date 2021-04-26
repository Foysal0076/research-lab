import axios from "axios"
import { NOTICE_FAIL, NOTICE_REQUEST, NOTICE_SUCCESS } from "./types"


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