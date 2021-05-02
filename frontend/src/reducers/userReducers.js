import { USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_RESET, USER_CREATE_SUCCESS, USER_EDIT_INFO_FAIL, USER_EDIT_INFO_REQUEST, USER_EDIT_INFO_RESET, USER_EDIT_INFO_SUCCESS, USER_INFO_FAIL, USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actions/types"


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {

                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {

                loading: false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {

                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading: true
            }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return {
                loading: true
            }
        case USER_INFO_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_INFO_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const userEditInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_EDIT_INFO_REQUEST:
            return {
                loading: true
            }
        case USER_EDIT_INFO_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload
            }
        case USER_EDIT_INFO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_EDIT_INFO_RESET:
            return {}

        default:
            return state
    }
}

export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return {
                loading: true
            }
        case USER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_CREATE_RESET:
            return {}

        default:
            return state
    }
}