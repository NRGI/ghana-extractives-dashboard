import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProductionComponent.scss'

const ProductionComponent = ({}) => (
  <div className="ProductionComponent">
    <h3 className="title is-4">Production volume per company (project) per year</h3>
    <input type="range"/>
    <code>D3 will go here</code>
  </div>
);

ProductionComponent.propTypes = {}

ProductionComponent.defaultProps = {}

export default ProductionComponent
