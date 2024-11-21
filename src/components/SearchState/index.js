/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchState = props => {
  const {id, stateName, stateCode} = props

  return (
    <li className="search-state-list">
      <Link to={`/state/${id}`} className="search-link-class">
        <div className="search-container-row">
          <p className="search-heading">{stateName}</p>
          <button type="button" className="search-button-class">
            {stateCode}
            <BiChevronRightSquare
              testid="searchResultChevronRightIcon"
              alt="line icon"
              className="search-logo"
            />
          </button>
        </div>
      </Link>
    </li>
  )
}

export default SearchState
