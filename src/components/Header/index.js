import {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickMenu = () => {
    this.setState(prevState => ({
      displayNavbar: !prevState.displayNavbar,
    }))
  }

  onClickCross = () => {
    this.setState({displayNavbar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onClickWebSiteLogo = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {displayNavbar} = this.state

    return (
      <div>
        <div className="header-container">
          <div className="header-website-logo1">
            <NavLink to="/">
              <>
                <img
                  className="header-website-logo"
                  src="https://res.cloudinary.com/dmonf0pws/image/upload/v1651988488/Group_7731_vs42i7.png"
                  alt="website logo"
                />
              </>
            </NavLink>
          </div>
          <ul className="tabs-container">
            <NavLink
              className={({isActive}) => (isActive ? 'active' : 'inactive')}
              exact
              to="/"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className={({isActive}) => (isActive ? 'active' : 'inactive')}
              to="/shelf"
            >
              <li>Bookshelves</li>
            </NavLink>
            <NavLink
              className={({isActive}) => (isActive ? 'active' : 'inactive')}
              to="/favorites"
            >
              <li>MyFavorites</li>
            </NavLink>
            <li className="list-item">
              <button
                onClick={this.onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-navbar-responsive-container">
          <div className="header-nav-container">
            <NavLink to="/">
              <img
                className="header-nav-bar-website-logo"
                src="https://res.cloudinary.com/dmonf0pws/image/upload/v1651988488/Group_7731_vs42i7.png"
                alt="website logo"
              />
            </NavLink>
            <button
              onClick={this.onClickMenu}
              className="cross-icon-btn"
              type="button"
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>
          {displayNavbar && (
            <>
              <div className="header-navbar-tabs-container">
                <NavLink
                  className={({isActive}) => (isActive ? 'active' : 'inactive')}
                  exact
                  to="/"
                >
                  <h1 className="header-mobile">Home</h1>
                </NavLink>
                <NavLink
                  className={({isActive}) => (isActive ? 'active' : 'inactive')}
                  to="/shelf"
                >
                  <h1 className="header-mobile">BookShelves</h1>
                </NavLink>
                <NavLink
                  className={({isActive}) => (isActive ? 'active' : 'inactive')}
                  to="/favorites"
                >
                  <h1 className="header-mobile">MyFavorites</h1>
                </NavLink>
              </div>
              <div className="header-navbar-tabs-container">
                <button
                  onClick={this.onClickLogout}
                  className="logout-btn"
                  type="button"
                >
                  Logout
                </button>
                <button
                  onClick={this.onClickCross}
                  className="cross-icon-btn"
                  type="button"
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
