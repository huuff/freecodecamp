import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './quote-slice'
import statusReducer from './status-slice'

export default configureStore({
    reducer: {
        quote: quoteReducer,
        status: statusReducer,
    },
})
