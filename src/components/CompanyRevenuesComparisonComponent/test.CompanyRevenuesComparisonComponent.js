import React from 'react'
import { shallow } from 'enzyme'

import CompanyRevenuesComparisonComponent from './CompanyRevenuesComparisonComponent'

describe('CompanyRevenuesComparisonComponent', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CompanyRevenuesComparisonComponent {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})