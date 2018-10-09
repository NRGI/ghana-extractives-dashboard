import React from 'react'
import PropTypes from 'prop-types'
import styles from './NavigationComponent.scss'
import ScrollableAnchor from 'react-scrollable-anchor/lib/ScrollableAnchor';

const sections = [
  {
    path: '#total-revenues-by-commodity',
    name: 'Total Revenues by Commodity'
  },
  {
    path: '#company-revenues-by-commodity',
    name: 'Company Revenues by Commodity'
  },
  {
    path: '#company-revenues-by-revenue-type',
    name: 'Company Revenues by Revenue Type'
  },
  {
    path: '#company-and-government-revenue-flows',
    name: 'Company and Government Revenue Flows'
  },
  {
    path: '#company-revenue-comparisons',
    name: 'Company Revenue Comparisons'
  }
]

const NavigationComponent = ({ }) => (
  <ScrollableAnchor id="home">
    <nav className="NavigationComponent navbar">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="#home">
            <img src="//www.gheiti.gov.gh/site/templates/pjo_enoica/images/logo.png" />
          </a>
          {/* <a role="button" className="navbar-burger burger">
          <span></span>
          <span></span>
          <span></span>
        </a> */}
        </div>

        {/* <div className="navbar-menu"> */}
        <div className="navbar-start">
          {sections.map((section, index) => <a key={index} className="navbar-item" href={section.path}>{section.name}</a>)}
        </div>
        {/* </div> */}
      </div>
    </nav>
  </ScrollableAnchor>
);

NavigationComponent.propTypes = {}

NavigationComponent.defaultProps = {}

// const cats = () => (
//   <nav className="NavigationComponent">
//     <ul>
//       {sections.map((section, index) =>
//         <li key={index}>
//           {/* <button onClick={event => console.log(event.target)}>{section.name}</button> */}
//           <a href={section.path}>{section.name}</a>
//         </li>)
//       }
//     </ul>
//   </nav>
// )

export default NavigationComponent
