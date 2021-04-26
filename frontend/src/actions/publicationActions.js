import axios from "axios"
import { PUBLICATIONS_FAIL, PUBLICATIONS_REQUEST, PUBLICATIONS_SUCCESS } from "./types"


export const getPublications = () => async (dispatch) => {
    try {
        dispatch({ type: PUBLICATIONS_REQUEST })

        const { data } = await axios.get('/api/publications')

        dispatch({
            type: PUBLICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PUBLICATIONS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}