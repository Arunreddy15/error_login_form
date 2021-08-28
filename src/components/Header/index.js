// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div>
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png "
        alt="nav home"
        className="header-icon"
      />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/products">
          <li>Products</li>
        </Link>
      </ul>
    </nav>
  </div>
)

export default Header
