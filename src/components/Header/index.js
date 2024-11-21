import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  toggleMenu = () =>
    this.setState(prevState => ({showMenu: !prevState.showMenu}))

  closeMenu = () => this.setState({showMenu: false})

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    const homeClassName = path === '/' ? 'link-name highlight' : 'link-name'
    const aboutClassName =
      path === '/about' ? 'link-name highlight' : 'link-name'

    return (
      <>
        {/* Desktop Navigation */}
        <nav className="header-list">
          <Link to="/" className="link-logo">
            <span className="app-name">COVID19</span>
            <span className="app-name blue-text">INDIA</span>
          </Link>
          <ul className="nav-list">
            <li>
              <Link to="/" className="link-logo" onClick={this.closeMenu}>
                <button type="button" className={homeClassName}>
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-logo" onClick={this.closeMenu}>
                <button type="button" className={aboutClassName}>
                  About
                </button>
              </Link>
            </li>
            <li>
              <Link
                to="/vaccination"
                className="link-logo"
                onClick={this.closeMenu}
              >
                <button type="button" className={aboutClassName}>
                  Vaccination
                </button>
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="menu-button"
            onClick={this.toggleMenu}
            aria-label="Toggle Menu"
          >
            <img
              src="https://res.cloudinary.com/dvosw6fkt/image/upload/v1662780401/hamberger_pz0cua.svg"
              alt="menu icon"
              className="menu-image"
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {showMenu && (
          <ul className="menu-list">
            <li>
              <Link to="/" className="link-item" onClick={this.closeMenu}>
                <button type="button" className={homeClassName}>
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-item" onClick={this.closeMenu}>
                <button type="button" className={aboutClassName}>
                  About
                </button>
              </Link>
            </li>
            <li className="close-item">
              <button
                type="button"
                className="close-button"
                onClick={this.closeMenu}
                aria-label="Close Menu"
              >
                <img
                  src="https://res.cloudinary.com/dvosw6fkt/image/upload/v1662780761/close_yojsls.svg"
                  alt="close icon"
                  className="close-icon"
                />
              </button>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
