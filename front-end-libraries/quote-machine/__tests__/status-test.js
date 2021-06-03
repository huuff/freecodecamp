import React from 'react'
import ReactDOM from 'react-dom'
import {StatusAlert} from '../src/status'

// React testing library
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer
    .create(<StatusAlert code="ERROR" showError={true}/>)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

