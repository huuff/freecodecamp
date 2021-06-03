import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import Main from '../src/main'

// React testing library
import { cleanup, render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Redux
import { Provider } from 'react-redux'
import store from '../src/store'

// Async tests don't work without this
// Maybe I should put in jest.init.js
// Check [this issue](https://github.com/facebook/jest/issues/3126#issuecomment-345949328)
import 'babel-polyfill'

afterEach(cleanup)

const randomString = () => Math.random().toString(36).substr(2, 5)

const mockFetch = jest.fn((log, params) => {
  const randomAuthor = randomString()
  const randomQuote = {
      text: randomString(),
      author: randomAuthor,
      authorSlug: randomAuthor,
      tags: [ randomString() ],
  }

  return Promise.resolve(Object.assign({}, randomQuote, params))
})

test('changes quote randomly', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  const firstQuoteText = (await screen.findByTestId("quote-text")).textContent

  fireEvent.click(screen.getByText("Random quote"))
  await waitForElementToBeRemoved(() => screen.queryByText(firstQuoteText))

  const secondQuoteText = (await screen.findByTestId("quote-text")).textContent

  expect(secondQuoteText).not.toBe(firstQuoteText)
})

test('changes quote by same author', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  const firstQuoteAuthor = (await screen.findByTestId("quote-author")).textContent
  const firstQuoteText = (await screen.findByTestId("quote-text")).textContent

  fireEvent.click(screen.getByText("Quote from this author"))
  await waitForElementToBeRemoved(() => screen.queryByText(firstQuoteText))

  const secondQuoteText = (await screen.findByTestId("quote-text")).textContent
  const secondQuoteAuthor = (await screen.findByTestId("quote-author")).textContent

  expect(secondQuoteText).not.toBe(firstQuoteText)
  expect(secondQuoteAuthor).toBe(firstQuoteAuthor)
})

test('changes quote by tag', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  const firstQuoteText = (await screen.findByTestId("quote-text")).textContent
  const firstQuoteTag = screen.getByTestId("tags-container").firstChild
  const firstQuoteTagText = firstQuoteTag.textContent

  fireEvent.click(firstQuoteTag)
  await waitForElementToBeRemoved(() => screen.queryByText(firstQuoteText))

  const secondQuoteText = (await screen.findByTestId("quote-text")).textContent
  const secondQuoteTag = screen.getByTestId("tags-container").firstChild
  const secondQuoteTagText = secondQuoteTag.textContent

  expect(secondQuoteText).not.toBe(firstQuoteText)
  expect(secondQuoteTagText).toBe(firstQuoteTagText)
})
