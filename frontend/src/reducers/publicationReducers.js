import { PUBLICATIONS_FAIL, PUBLICATIONS_REQUEST, PUBLICATIONS_SUCCESS, PUBLICATION_ADD_FAIL, PUBLICATION_ADD_REQUEST, PUBLICATION_ADD_SUCCESS, PUBLICATION_ADD_RESET, PUBLICATION_EDIT_REQUEST, PUBLICATION_EDIT_SUCCESS, PUBLICATION_EDIT_FAIL, PUBLICATION_REQUEST, PUBLICATION_SUCCESS, PUBLICATION_FAIL, PUBLICATION_EDIT_RESET, AUTHOR_PUB_LINK_REQUEST, AUTHOR_PUB_LINK_SUCCESS, AUTHOR_PUB_LINK_FAIL, AUTHOR_PUB_LINK_RESET, AUTHOR_PUB_REMOVE_LINK_REQUEST, AUTHOR_PUB_REMOVE_LINK_SUCCESS, AUTHOR_PUB_REMOVE_LINK_FAIL, AUTHOR_PUB_REMOVE_LINK_RESET } from "../actions/types"


export const publicationListReducer = (state = { publications: [] }, action) => {
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

export const publicationAddReducer = (state = {}, action) => {
    switch (action.type) {
        case PUBLICATION_ADD_REQUEST:
            return ({
                loading: true
            })
        case PUBLICATION_ADD_SUCCESS:
            return ({
                loading: false,
                success: true
            })
        case PUBLICATION_ADD_FAIL:
            return ({
                loading: false,
                error: action.payload
            })
        case PUBLICATION_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const publicationReducer = (state = {}, action) => {
    switch (action.type) {
        case PUBLICATION_REQUEST:
            return ({
                loading: true
            })
        case PUBLICATION_SUCCESS:
            return ({
                loading: false,
                publication: action.payload
            })
        case PUBLICATION_FAIL:
            return ({
                loading: false,
                error: action.payload
            })

        default:
            return state
    }
}

export const publicationEditReducer = (state = {}, action) => {
    switch (action.type) {
        case PUBLICATION_EDIT_REQUEST:
            return ({
                loading: true
            })
        case PUBLICATION_EDIT_SUCCESS:
            return ({
                loading: false,
                success: true
            })
        case PUBLICATION_EDIT_FAIL:
            return ({
                loading: false,
                error: action.payload
            })
        case PUBLICATION_EDIT_RESET:
            return {}

        default:
            return state
    }
}

export const AuthorPubLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHOR_PUB_LINK_REQUEST:
            return ({
                loading: true
            })
        case AUTHOR_PUB_LINK_SUCCESS:
            return ({
                loading: false,
                success: true
            })
        case AUTHOR_PUB_LINK_FAIL:
            return ({
                loading: false,
                error: action.payload
            })
        case AUTHOR_PUB_LINK_RESET:
            return {}

        default:
            return state
    }
}

export const AuthorPubRemoveLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHOR_PUB_REMOVE_LINK_REQUEST:
            return ({
                loading: true
            })
        case AUTHOR_PUB_REMOVE_LINK_SUCCESS:
            return ({
                loading: false,
                success: true
            })
        case AUTHOR_PUB_REMOVE_LINK_FAIL:
            return ({
                loading: false,
                error: action.payload
            })
        case AUTHOR_PUB_REMOVE_LINK_RESET:
            return {}

        default:
            return state
    }
}