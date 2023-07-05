import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { registerUserReducer,loadingReducer,getAllUserReducer,loginUserReducer,logoutUserReducer,authReducer,getUsersByIdReducer} from './Reducers/userReducer'
import { getExamReducer,getAllQuestionsReducer,getExamByIdReducer,getResultByExamIdReducer,getResultByUserIdsReducer } from './Reducers/examReducer'


 const user = sessionStorage.getItem('userData') !== null || undefined ? true : false
 const token = sessionStorage.getItem('userData') !== null || undefined ? sessionStorage.getItem('userData') : null
// const token = Cookies.get('jwtoken')
// console.log(token)
const rootReducer = combineReducers({
    registerUserReducer: registerUserReducer,
    loadingReducer: loadingReducer,
    getAllUserReducer: getAllUserReducer,
    loginUserReducer: loginUserReducer,
    logoutUserReducer : logoutUserReducer,
    authReducer : authReducer,
    getExamReducer : getExamReducer,
    getAllQuestionsReducer : getAllQuestionsReducer,
    getExamByIdReducer : getExamByIdReducer,
    getResultByExamIdReducer: getResultByExamIdReducer,
    getUsersByIdReducer: getUsersByIdReducer,
    getResultByUserIdsReducer : getResultByUserIdsReducer
})

const initilState = {
    loginUserReducer:{
        token: token
    },
    authReducer:{
          isAuthenticated: user
    }
}

const middleware = [thunk]

const store = createStore(rootReducer,initilState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;