import React from 'react'
import { shallow } from 'enzyme'

import CompaniesComponent from './CompaniesComponent'

describe('CompaniesComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CompaniesComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})