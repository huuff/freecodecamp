import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import Main from '../src/main'

// React testing library
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Redux
import { Provider } from 'react-redux'
import store from '../src/store'

// Async tests don't work without this
// Maybe I should put in jest.init.js
// Check [this issue](https://github.com/facebook/jest/issues/3126#issuecomment-345949328)
import 'babel-polyfill'

const randomString = () => Math.random().toString(36).substr(2, 5)

const mockFetch = jest.fn(() => Promise.resolve({
    quote: {
        text: randomString(),
        author: randomString(),
        tags: [],
    },
}))

test('changes quote randomly', async () => {
    render(
      <Provider store={store}>
            <Main fetchQuote={mockFetch} waitTime={0}/>
        </Provider>
    )

  const firstQuote = await screen.findByTestId("quote-text")
  const firstQuoteText = firstQuote.textContent;

  fireEvent.click(screen.getByText("Random quote"))
  await waitForElementToBeRemoved(() => screen.queryByText(firstQuoteText))

  const secondQuote = await screen.findByTestId("quote-text")
  const secondQuoteText = secondQuote.textContent

  expect(secondQuoteText).not.toBe(firstQuoteText)
})

