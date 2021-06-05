import React from 'react'
import ReactDOM from 'react-dom'

import Main from '../src/main'

// React testing library
import { cleanup, render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Redux
import { Provider } from 'react-redux'
import { newStore } from '../src/store'
import { setStatus } from '../src/status-slice'

// Make CSSTransition instantaneous so we don't have to wait
// for the transitions to be over
import { config } from 'react-transition-group'
config.disabled = true

var store;

beforeEach(() => {
  store = newStore()
})

afterEach(() => cleanup)

const mockFetch = jest.fn((log, params) => Promise.resolve({
  text: "Test quote",
  author: "Test author",
  authorSlug: "test-author",
  tags: [],
}))

test('alert does not appear on start', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  const statusAlert = screen.queryByTestId('status-alert')

  expect(statusAlert).toBeNull()
})

test('alert appears when no suitable quote is found', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  await screen.findByTestId("quote-text")

  expect(screen.queryByTestId('status-alert')).toBeNull()

  fireEvent.click(screen.getByText("Quote from this author"))

  expect(await screen.findByTestId('status-alert')).not.toBeNull()
})

test('the alert can be closed by clicking its button', async () => {
  render(
    <Provider store={store}>
    <Main fetchQuote={mockFetch} waitTime={0}/>
    </Provider>
  )

  expect(screen.queryByTestId('status-alert')).toBeNull()

  store.dispatch(setStatus('ERROR')) 

  fireEvent.click(screen.getByTestId("close-alert"))

  // HACK: This amounts to testing that it's invisible, but it's pretty
  // dependent on the implementation (CSSTransitionGroup). "not.toBeVisible"
  // is not working for me. Look into it.
  expect(screen.queryByTestId('status-alert')).toHaveClass('fade-effect-exit-done')

})
