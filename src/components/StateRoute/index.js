/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StateCards from '../StateCards'
import TopDistricts from '../TopDistricts'
import Charts from '../Charts'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateRoute extends Component {
  state = {
    isLoading: true,
    totalState: [],
    totalTested: 0,
    listStateName: '',
    stateCode: '',
    stateDate: '',
    localStoreData: [],
    id: '',
    isStateCard: true,
    category: 'Confirmed',
  }

  componentDidMount() {
    this.districtData()
  }

  districtData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data/'
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const stateTested = data[stateCode].total.tested
      const isStateCode = statesList.filter(
        eachItem => eachItem.state_code === stateCode,
      )
      const totalStateData = data[stateCode].total
      const stateName = isStateCode[0].state_name
      const newDate = new Date(data[stateCode].meta.last_updated)

      this.setState({
        isLoading: false,
        totalState: totalStateData,
        listStateName: stateName,
        stateDate: newDate,
        localStoreData: data,
        id: stateCode,
        stateCode,
        totalTested: stateTested,
      })
    } else {
      console.log('Fetch Error')
    }
  }

  stateData = () => {
    const {id, localStoreData, category} = this.state
    const listOfDistrict = localStoreData[id].districts
    const listOfDistrictName = Object.keys(listOfDistrict)
    const lowerCaseDis = category.toLowerCase()
    const dataElement = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue: listOfDistrict[eachItem].total[lowerCaseDis]
        ? listOfDistrict[eachItem].total[lowerCaseDis]
        : 0,
    }))

    dataElement.sort((a, b) => b.districtValue - a.districtValue)

    const stateActiveCase = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue:
        listOfDistrict[eachItem].total.confirmed -
        (listOfDistrict[eachItem].total.recovered +
          listOfDistrict[eachItem].total.deceased)
          ? listOfDistrict[eachItem].total.confirmed -
            (listOfDistrict[eachItem].total.recovered +
              listOfDistrict[eachItem].total.deceased)
          : 0,
    }))
    stateActiveCase.sort((a, b) => b.districtValue - a.districtValue)

    if (lowerCaseDis === 'active') {
      return stateActiveCase
    }
    return dataElement
  }

  stateListCards = card => {
    this.setState({category: card, isStateCard: false})
  }

  districtName = () => {
    const {
      listStateName,
      totalTested,
      totalState,
      isStateCard,
      stateDate,
      category,
      stateCode,
    } = this.state
    const topDistricts = this.stateData()

    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <div className="stateRouter-column">
        <div className="state-tested-container">
          <h1 className="stateRoute-heading stateRoute-heading-container">
            {listStateName}
          </h1>
          <div>
            <p className="stateRoute-tested">Tested</p>
            <p className="stateRoute-total-tested">{totalTested}</p>
          </div>
        </div>
        <div>
          <p className="stateRoute-date">{`Last update on ${
            months[stateDate.getMonth()]
          } ${stateDate.getDate()} ${stateDate.getFullYear()}.`}</p>
        </div>
        <div className="stateRoute-cards">
          <StateCards
            stateListCards={this.stateListCards}
            totalStateCards={totalState}
            isStateCard={isStateCard}
          />
        </div>
        <div className="stateRoute-top-districts">
          <h1
            className={`stateRoute-top-districts-heading stateRoute-${category}`}
          >
            Top Districts
          </h1>
          <div className="stateRoute-ul">
            <div className="stateRoute-ul-container">
              <ul
                className="stateRoute-top-district-list"
                testid="topDistrictsUnorderedList"
              >
                {topDistricts.map(eachItem => (
                  <TopDistricts
                    topDistrictsNumber={eachItem.districtValue}
                    topDistrictsName={eachItem.districtNameList}
                    key={eachItem.districtNameList}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="stateRoute-chart-container"
          testid="lineChartsContainer"
        >
          <Charts districtsChart={category} districtCode={stateCode} />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="StateRoute-container">
          {isLoading ? (
            <div className="loading-class" data-testid="stateDetailsLoader">
              <Loader type="Oval" color="#007BFF" height={50} width={50} />
            </div>
          ) : (
            this.districtName()
          )}
          <Footer />
        </div>
      </>
    )
  }
}

export default StateRoute
