import { VISITOR_MESSAGE_SEND_FAIL, VISITOR_MESSAGE_SEND_REQUEST, VISITOR_MESSAGE_SEND_RESET, VISITOR_MESSAGE_SEND_SUCCESS } from "../actions/types"


export const visitorMessageSendReducer = (state = {}, action) => {
    switch (action.type) {
        case VISITOR_MESSAGE_SEND_REQUEST:
            return {
                loading: true
            }
        case VISITOR_MESSAGE_SEND_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case VISITOR_MESSAGE_SEND_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case VISITOR_MESSAGE_SEND_RESET:
            return {}

        default:
            return state
    }
}