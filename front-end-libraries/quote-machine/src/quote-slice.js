import { createSlice } from '@reduxjs/toolkit'

// TODO: DRY
export const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
            text: "",
            author: "",
            authorSlug: "",
            tags: [],
    },
    reducers: {
        changeQuote: (state, action) => {
            state.text = action.payload.text;
            state.author = action.payload.author;
            state.authorSlug = action.payload.authorSlug;
            state.tags = action.payload.tags;
        },
    },
})

export const { changeQuote } = quoteSlice.actions
export default quoteSlice.reducer
