import React from 'react'
import { shallow } from 'enzyme'

import BodyComponent from './BodyComponent'

describe('BodyComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<BodyComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})