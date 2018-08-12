import React from 'react'
import { shallow } from 'enzyme'

import CommoditiesComponent from './CommoditiesComponent'

describe('CommoditiesComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CommoditiesComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})