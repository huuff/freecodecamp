import React from 'react'
import ReactDOM from 'react-dom'

import Main from '../src/index'

// React testing library
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

// Redux
import store from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const mockFetch = jest.fn(() => ({
    quote: {
        text: Math.random().toString(36).substr(2, 5),
        author: Math.random().toString(36).substr(2, 5),
        tags: [],
    },
}))

test('changes quote randomly', () => {
    render(
        <Provider store={store}>
            <Main fetchQuote={mockFetch} />
        </Provider>
    )
})

