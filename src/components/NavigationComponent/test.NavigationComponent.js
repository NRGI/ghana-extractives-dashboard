import React from 'react'
import { shallow } from 'enzyme'

import NavigationComponent from './NavigationComponent'

describe('NavigationComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<NavigationComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})