import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './quote-slice'
import statusReducer from './status-slice'
import  visualReducer  from './visual'

export default configureStore({
    reducer: {
        quote: quoteReducer,
        status: statusReducer,
        visual: visualReducer,
    },
})
