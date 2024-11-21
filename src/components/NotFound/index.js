import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="NotFound-container">
      <img
        src="https://res.cloudinary.com/dvosw6fkt/image/upload/v1662739043/Group_7484_eapvn5.jpg"
        alt="not-found-pic"
      />
      <h1 className="NotFound-heading">PAGE NOT FOUND</h1>
      <p className="NotFound-paragraph">
        we are sorry, the page you requested could not be found
      </p>
      <div>
        <Link to="/">
          <button type="button" className="NotFound-button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
