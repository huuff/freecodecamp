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

export const newStore = () => configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default newStore()

/* Previously I used the rootReducer and resetAction to reset the store to the initial state
 * between tests. Now, I just use newStore and create a new store every time, however
 * I'm keeping rootReducer and resetAction for the time being just because the feature looks
 * handy and it's unobtrusive.
 */
