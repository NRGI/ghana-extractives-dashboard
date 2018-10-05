import React from 'react'
import { shallow } from 'enzyme'

import SankeyChart from './SankeyChart'

describe('SankeyChart', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<SankeyChart {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})