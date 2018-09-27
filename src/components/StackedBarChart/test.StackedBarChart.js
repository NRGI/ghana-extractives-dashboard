import React from 'react'
import { shallow } from 'enzyme'

import StackedBarChart from './StackedBarChart'

describe('StackedBarChart', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<StackedBarChart {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})