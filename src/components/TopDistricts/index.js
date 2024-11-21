import './index.css'

const TopDistricts = props => {
  const {topDistrictsNumber, topDistrictsName} = props

  return (
    <li className="topDistricts-list">
      <p className="topDistricts-paragraph">{topDistrictsNumber}</p>
      <p className="topDistricts-Name">{topDistrictsName}</p>
    </li>
  )
}

export default TopDistricts
