import React from 'react'
import { shallow } from 'enzyme'

import RevenuesComponent from './RevenuesComponent'

describe('RevenuesComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<RevenuesComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})