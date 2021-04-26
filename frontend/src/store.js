import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { noticeReducer } from './reducers/noticeReducers'
import { facultyDetailsReducer, facultyListReducer } from './reducers/facultyReducers'
import { publicationReducer } from './reducers/publicationReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}

const middleWare = [thunk]

const devtools = process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleWare)
    : composeWithDevTools(applyMiddleware(...middleWare))

const reducer = combineReducers({
    userLogin: userLoginReducer,
    notice: noticeReducer,
    facultyList: facultyListReducer,
    facultyDetails: facultyDetailsReducer,
    publicationList: publicationReducer,
})

const store = createStore(
    reducer,
    initialState,
    devtools
)

export default store