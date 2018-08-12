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
    name: 'Commodities'
  },
  {
    path: '#',
    name: 'Companies'
  },
  {
    path: '#',
    name: 'Production'
  },
  {
    path: '#',
    name: 'Revenues'
  },
  {
    path: '#',
    name: 'Data'
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
