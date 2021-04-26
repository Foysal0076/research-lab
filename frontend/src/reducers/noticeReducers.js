import { NOTICE_FAIL, NOTICE_REQUEST, NOTICE_SUCCESS } from "../actions/types"



export const noticeReducer = (state = { notices: [] }, action) => {
    switch (action.type) {
        case NOTICE_REQUEST:
            return {
                loading: true
            }

        case NOTICE_SUCCESS:
            return {
                loading: false,
                notices: action.payload
            }

        case NOTICE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}