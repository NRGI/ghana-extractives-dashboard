import React from 'react'
import { shallow } from 'enzyme'

import RevenueFlowsComponent from './RevenueFlowsComponent'

describe('RevenueFlowsComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<RevenueFlowsComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})