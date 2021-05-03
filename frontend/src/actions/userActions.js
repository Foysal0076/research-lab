import axios from "axios"
import { USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_EDIT_INFO_FAIL, USER_EDIT_INFO_REQUEST, USER_EDIT_INFO_SUCCESS, USER_INFO_FAIL, USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./types"



export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {

    localStorage.removeItem('userInfo')

    dispatch({ type: USER_LOGOUT })

    document.location.href = '/'

}

export const listUsers = (keyword = '') => async (dispatch, geState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = geState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users?keyword=${keyword}`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserInfo = (id) => async (dispatch, geState) => {
    try {
        dispatch({ type: USER_INFO_REQUEST })

        const { userLogin: { userInfo } } = geState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_INFO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const editUserInfo = (id, name, email, isAdmin, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_EDIT_INFO_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${id}`, { name, email, isAdmin, password }, config)

        dispatch({
            type: USER_EDIT_INFO_SUCCESS,
            payload: data
        })

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data
        // })
        // localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_EDIT_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

