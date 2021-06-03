import React from 'react'
import ReactDOM from 'react-dom'

import Enzyme, {shallow, render, mount} from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import QuoteBox from '../src/quote-box'

Enzyme.configure({adapter: new Adapter()})

it('QuoteBox renders corrently', () => {
  const wrapper = shallow(<QuoteBox
    quote={{ text: "", author: "", tags: []}}

    />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
