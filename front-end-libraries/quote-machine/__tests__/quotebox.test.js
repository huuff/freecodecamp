import React from 'react'
import ReactDOM from 'react-dom'

import QuoteBox from '../src/quote-box'

// React testing library
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

const firstQuote = { 
  text: "First quote", 
  author: "First author", 
  tags: [],
}

const secondQuote = {
  text: "Second quote",
  author: "Second author",
  tags: []
}

test('renders correctly', () => {
  const tree = renderer
    .create(<QuoteBox quote={firstQuote} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('changes quote randomly', () => {
  var quote = firstQuote
  const requestQuoteMock = jest.fn(() => {
    quote = secondQuote
  })
  
  const {rerender} = render(<QuoteBox 
    quote={quote} 
    requestQuote={requestQuoteMock}
    />)


  fireEvent.click(screen.getByText('Random quote'))
  rerender(<QuoteBox quote={quote} />)

  expect(screen.getByText(`"${secondQuote.text}"`)).toBeInTheDocument()
})

