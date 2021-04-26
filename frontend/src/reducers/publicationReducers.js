import { PUBLICATIONS_FAIL, PUBLICATIONS_REQUEST, PUBLICATIONS_SUCCESS } from "../actions/types"


export const publicationReducer = (state = { publications: [] }, action) => {
    switch (action.type) {
        case PUBLICATIONS_REQUEST:
            return ({
                loading: true
            })
        case PUBLICATIONS_SUCCESS:
            return ({
                loading: false,
                publications: action.payload
            })
        case PUBLICATIONS_FAIL:
            return ({
                loading: false,
                error: action.payload
            })

        default:
            return state
    }
}