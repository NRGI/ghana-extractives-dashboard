import React from 'react'
import { shallow } from 'enzyme'

import CompaniesByCommodityComponent from './CompaniesByCommodityComponent'

describe('CompaniesByCommodityComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CompaniesByCommodityComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})