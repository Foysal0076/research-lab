import { FACULTY_DETAILS_FAIL, FACULTY_DETAILS_REQUEST, FACULTY_DETAILS_SUCCESS, FACULTY_FAIL, FACULTY_PROFILE_CREATE_FAIL, FACULTY_PROFILE_CREATE_REQUEST, FACULTY_PROFILE_CREATE_SUCCESS, FACULTY_PROFILE_FAIL, FACULTY_PROFILE_REQUEST, FACULTY_PROFILE_SUCCESS, FACULTY_REQUEST, FACULTY_SUCCESS } from "../actions/types"


export const facultyListReducer = (state = { faculty: [] }, action) => {
    switch (action.type) {
        case FACULTY_REQUEST:
            return {
                loading: true
            }

        case FACULTY_SUCCESS:
            return {
                loading: false,
                faculty: action.payload
            }

        case FACULTY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const facultyDetailsReducer = (state = { facultyDetails: null }, action) => {
    switch (action.type) {
        case FACULTY_DETAILS_REQUEST:
            return {
                loading: true
            }

        case FACULTY_DETAILS_SUCCESS:
            return {
                loading: false,
                facultyDetails: action.payload
            }

        case FACULTY_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const facultyProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case FACULTY_PROFILE_REQUEST:
            return {
                loading: true
            }

        case FACULTY_PROFILE_SUCCESS:
            return {
                loading: false,
                profile: action.payload
            }

        case FACULTY_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const facultyProfileCreateReducer = (state = { }, action) => {
    switch (action.type) {
        case FACULTY_PROFILE_CREATE_REQUEST:
            return {
                loading: true
            }

        case FACULTY_PROFILE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case FACULTY_PROFILE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}