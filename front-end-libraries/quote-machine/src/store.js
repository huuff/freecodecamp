import logger from 'redux-logger'
import { configureStore, createAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import quoteReducer from './quote-slice'
import statusReducer from './status-slice'
import  visualReducer  from './visual'
import { debugReducer } from './debug'

const appReducer = combineReducers({
    quote: quoteReducer,
    status: statusReducer,
    visual: visualReducer,
    debug: debugReducer
})

const rootReducer = (state, action) => {
    if (action.type === "RESET")
        return appReducer(undefined, action)

    return appReducer(state, action)
}

export const resetAction = createAction("RESET")

export default configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

