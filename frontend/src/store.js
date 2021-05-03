import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userCreateReducer, userEditInfoReducer, userInfoReducer, userListReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { noticeCreateReducer, noticeDeleteReducer, noticeEditReducer, noticeReducer } from './reducers/noticeReducers'
import { facultyDetailsReducer, facultyListReducer, facultyProfileCreateReducer, facultyProfileEditReducer, facultyProfileReducer } from './reducers/facultyReducers'
import { AuthorPubLinkReducer, AuthorPubRemoveLinkReducer, publicationAddReducer, publicationEditReducer, publicationListReducer, publicationReducer } from './reducers/publicationReducers'
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
    publicationList: publicationListReducer,
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
    facultyProfileEdit: facultyProfileEditReducer,
    userCreate: userCreateReducer,
    publicationAdd: publicationAddReducer,
    publicationEdit: publicationEditReducer,
    publication: publicationReducer,
    authorPubLink: AuthorPubLinkReducer,
    authorPubRemoveLink: AuthorPubRemoveLinkReducer,
})

const store = createStore(
    reducer,
    initialState,
    devtools
)

export default store