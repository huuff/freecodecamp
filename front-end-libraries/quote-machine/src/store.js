import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './quote-slice'

export default configureStore({
    reducer: {
        quote: quoteReducer,
    },
})
