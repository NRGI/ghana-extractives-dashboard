import React from 'react'
import { shallow } from 'enzyme'

import DataComponent from './DataComponent'

describe('DataComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<DataComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})