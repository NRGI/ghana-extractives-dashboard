import React from 'react'
import { shallow } from 'enzyme'

import StackedAreaChart from './StackedAreaChart'

describe('StackedAreaChart', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<StackedAreaChart {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})