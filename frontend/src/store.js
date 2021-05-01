import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userEditInfoReducer, userInfoReducer, userListReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { noticeCreateReducer, noticeDeleteReducer, noticeEditReducer, noticeReducer } from './reducers/noticeReducers'
import { facultyDetailsReducer, facultyListReducer, facultyProfileCreateReducer, facultyProfileReducer } from './reducers/facultyReducers'
import { publicationReducer } from './reducers/publicationReducers'
import { visitorMessageDeleteReducer, visitorMessageListReducer, visitorMessageSendReducer } from './reducers/visitorMessageReducers'

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
    visitorMessageSend: visitorMessageSendReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    facultyProfile: facultyProfileReducer,
    facultyProfileCreate: facultyProfileCreateReducer,
    noticeCreate: noticeCreateReducer,
    noticeEdit: noticeEditReducer,
    noticeDelete: noticeDeleteReducer,
    userInfo: userInfoReducer,
    userEdit: userEditInfoReducer,
    visitorMessageList: visitorMessageListReducer,
    visitorMessageDelete: visitorMessageDeleteReducer,
})

const store = createStore(
    reducer,
    initialState,
    devtools
)

export default store