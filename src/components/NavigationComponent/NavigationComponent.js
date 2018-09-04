import React from 'react'
import PropTypes from 'prop-types'
import styles from './NavigationComponent.scss'

const sections = [
  {
    path: '#',
    name: 'Home'
  },
  {
    path: '#',
    name: 'Total Revenues by Commodity'
  },
  {
    path: '#',
    name: 'Company Revenues by Commodity'
  },
  {
    path: '#',
    name: 'Company Revenues by Revenue Type'
  },
  {
    path: '#',
    name: 'Company and Government Revenue Flows'
  },
  {
    path: '#',
    name: 'Company Revenue Comparisons'
  }
]

const NavigationComponent = ({ }) => (
  <nav className="NavigationComponent">
    <ul>
      {sections.map((section, index) =>
        <li key={index}>
          <button onClick={event => console.log(event.target)}>{section.name}</button>
        </li>)
      }
    </ul>
  </nav>
);

NavigationComponent.propTypes = {}

NavigationComponent.defaultProps = {}

export default NavigationComponent
