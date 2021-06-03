import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './quote-slice'
import statusReducer from './status-slice'
import  visualReducer  from './visual'
import { debugReducer } from './debug'

export default configureStore({
    reducer: {
        quote: quoteReducer,
        status: statusReducer,
        visual: visualReducer,
        debug: debugReducer,
    },
})
