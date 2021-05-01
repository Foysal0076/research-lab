import { NOTICE_CREATE_FAIL, NOTICE_CREATE_REQUEST, NOTICE_CREATE_SUCCESS, NOTICE_DELETE_FAIL, NOTICE_DELETE_REQUEST, NOTICE_DELETE_SUCCESS, NOTICE_EDIT_FAIL, NOTICE_EDIT_REQUEST, NOTICE_EDIT_SUCCESS, NOTICE_FAIL, NOTICE_REQUEST, NOTICE_SUCCESS } from "../actions/types"



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

export const noticeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTICE_CREATE_REQUEST:
            return {
                loading: true
            }

        case NOTICE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case NOTICE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const noticeEditReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTICE_EDIT_REQUEST:
            return {
                loading: true
            }

        case NOTICE_EDIT_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case NOTICE_EDIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const noticeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTICE_DELETE_REQUEST:
            return {
                loading: true
            }

        case NOTICE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case NOTICE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}