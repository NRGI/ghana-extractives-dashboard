import React from 'react'
import { storiesOf } from '@storybook/react'

import ProductionComponent from './ProductionComponent'

storiesOf('ProductionComponent', module).add('Example 1', () =>
  <ProductionComponent />
)