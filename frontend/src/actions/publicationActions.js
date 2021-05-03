import axios from "axios"
import { AUTHOR_PUB_LINK_FAIL, AUTHOR_PUB_LINK_REQUEST, AUTHOR_PUB_LINK_SUCCESS, AUTHOR_PUB_REMOVE_LINK_FAIL, AUTHOR_PUB_REMOVE_LINK_REQUEST, AUTHOR_PUB_REMOVE_LINK_SUCCESS, PUBLICATIONS_FAIL, PUBLICATIONS_REQUEST, PUBLICATIONS_SUCCESS, PUBLICATION_ADD_FAIL, PUBLICATION_ADD_REQUEST, PUBLICATION_ADD_SUCCESS, PUBLICATION_EDIT_FAIL, PUBLICATION_EDIT_REQUEST, PUBLICATION_EDIT_SUCCESS, PUBLICATION_FAIL, PUBLICATION_REQUEST, PUBLICATION_SUCCESS } from "./types"


export const getPublications = (keyword, filters = []) => async (dispatch) => {
    try {
        dispatch({ type: PUBLICATIONS_REQUEST })

        const { data } = await axios.get(`/api/publications?keyword=${keyword}&filters=${filters}`)

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

export const addPublications = (title, type, source, authorNames) => async (dispatch, getState) => {
    try {
        dispatch({ type: PUBLICATION_ADD_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/publications`, { title, type, source, authorNames }, config)

        dispatch({
            type: PUBLICATION_ADD_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PUBLICATION_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getPublication = (id) => async (dispatch) => {
    try {
        dispatch({ type: PUBLICATION_REQUEST })

        const { data } = await axios.get(`/api/publications/${id}`)

        dispatch({
            type: PUBLICATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PUBLICATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const editPublication = (publicationId, title, type, source, authorNames) => async (dispatch, getState) => {
    try {
        dispatch({ type: PUBLICATION_EDIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/publications/${publicationId}`, { title, type, source, authorNames }, config)

        dispatch({
            type: PUBLICATION_EDIT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PUBLICATION_EDIT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addAuthorPubLink = (authorId, publicationId) => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHOR_PUB_LINK_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/members/${authorId}/edit`, { publicationId }, config)

        await axios.put(`/api/publications/${publicationId}`, { authorId }, config)

        dispatch({
            type: AUTHOR_PUB_LINK_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: AUTHOR_PUB_LINK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const removeAuthorPubLink = (authorId, publicationId) => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHOR_PUB_REMOVE_LINK_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/members/${authorId}/edit?keyword=remove`, { publicationId }, config)

        await axios.put(`/api/publications/${publicationId}?keyword=remove`, { authorId }, config)

        dispatch({
            type: AUTHOR_PUB_REMOVE_LINK_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: AUTHOR_PUB_REMOVE_LINK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


