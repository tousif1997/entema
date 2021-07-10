import {createStore, combineReducers,applyMiddleware} from 'redux'

import userReducer from '../Reducers/userReducers'
import thunk from 'redux-thunk'




const  configureStore =()=>{
    const store = createStore(combineReducers({
        user : userReducer,
     
    }),applyMiddleware(thunk))

    return store
}

export default configureStore;