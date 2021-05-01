import { VISITOR_MESSAGE_DELETE_FAIL, VISITOR_MESSAGE_DELETE_REQUEST, VISITOR_MESSAGE_DELETE_SUCCESS, VISITOR_MESSAGE_LIST_FAIL, VISITOR_MESSAGE_LIST_REQUEST, VISITOR_MESSAGE_LIST_SUCCESS, VISITOR_MESSAGE_SEND_FAIL, VISITOR_MESSAGE_SEND_REQUEST, VISITOR_MESSAGE_SEND_RESET, VISITOR_MESSAGE_SEND_SUCCESS } from "../actions/types"


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

export const visitorMessageListReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case VISITOR_MESSAGE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case VISITOR_MESSAGE_LIST_SUCCESS:
            return {
                loading: false,
                messages: action.payload
            }
        case VISITOR_MESSAGE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const visitorMessageDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case VISITOR_MESSAGE_DELETE_REQUEST:
            return {

                loading: true
            }
        case VISITOR_MESSAGE_DELETE_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case VISITOR_MESSAGE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}