import React from 'react'
import { shallow } from 'enzyme'

import ProductionComponent from './ProductionComponent'

describe('ProductionComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<ProductionComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})