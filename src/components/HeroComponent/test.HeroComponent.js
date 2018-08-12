import React from 'react'
import { shallow } from 'enzyme'

import HeroComponent from './HeroComponent'

describe('HeroComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<HeroComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})