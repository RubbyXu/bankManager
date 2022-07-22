import {combineReducers} from 'redux'

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_ACCOUNT_INFO = 'UPDATE_ACCOUNT_INFO';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS';

const userInfo = (state={}, action) => {
    switch(action.type){
        case UPDATE_USER_INFO: 
        return action.payload;
        default: 
        return state
    }
}

const accountInfo =  (state={}, action) => {
    switch(action.type){
        case UPDATE_ACCOUNT_INFO: 
        return action.payload; 
        default: 
        return state
    }
}

const accounts =  (state=[], action) => {
    switch(action.type){
        case ADD_ACCOUNT: 
        const item = [...state, action.payload]
        return item; 
        case ADD_ACCOUNTS: 
        return action.payload; 
        default: 
        return state
    }
}

 

export default combineReducers({userInfo, accountInfo, accounts})