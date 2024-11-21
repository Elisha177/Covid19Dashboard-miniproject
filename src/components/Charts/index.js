/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import './index.css'

class Charts extends Component {
  state = {
    chartsList: [],
    isLoading: true,
    error: false,
  }

  componentDidMount() {
    this.fetchChartsData()
  }

  fetchChartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
    const {districtCode} = this.props

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()

        if (data[districtCode]) {
          const dates = Object.keys(data[districtCode].dates)
          const formattedData = dates.map(date => {
            const dateData = data[districtCode].dates[date].total || {}
            return {
              eachDate: date,
              confirmed: dateData.confirmed || 0,
              recovered: dateData.recovered || 0,
              deceased: dateData.deceased || 0,
              tested: dateData.tested || 0,
              active:
                (dateData.confirmed || 0) -
                ((dateData.recovered || 0) + (dateData.deceased || 0)),
            }
          })

          this.setState({
            chartsList: formattedData,
            isLoading: false,
          })
        } else {
          this.setState({error: true, isLoading: false})
        }
      } else {
        this.setState({error: true, isLoading: false})
      }
    } catch {
      this.setState({error: true, isLoading: false})
    }
  }

  renderLineChart = (dataKey, color) => {
    const {chartsList} = this.state
    return (
      <LineChart
        width={900}
        height={250}
        data={chartsList}
        margin={{top: 5, right: 50, left: 20, bottom: 5}}
      >
        <XAxis
          dataKey="eachDate"
          tick={{fontSize: 12, fontFamily: 'Roboto'}}
          dy={5}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} />
      </LineChart>
    )
  }

  renderCharts = () => {
    const {chartsList} = this.state
    const {districtsChart} = this.props
    const barChartType = districtsChart.toLowerCase()
    const recentData = chartsList.slice(-10)

    const barColors = {
      confirmed: '#9A0E31',
      active: '#0A4FA0',
      recovered: '#216837',
      deceased: '#474C57',
    }

    if (!barColors[barChartType]) {
      return <p className="error-message">Invalid chart type selected.</p>
    }

    return (
      <>
        {/* Bar Chart */}
        <BarChart
          width={700}
          height={240}
          barSize={35}
          data={recentData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            tick={{fontSize: 10, fontFamily: 'Roboto'}}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={barChartType}
            fill={barColors[barChartType]}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>

        {/* Line Charts */}
        <div>
          {this.renderLineChart('confirmed', '#FF073A')}
          {this.renderLineChart('active', '#007BFF')}
          {this.renderLineChart('recovered', '#27A243')}
          {this.renderLineChart('deceased', '#6C757D')}
          {this.renderLineChart('tested', '#9673B9')}
        </div>
      </>
    )
  }

  render() {
    const {isLoading, error} = this.state

    if (isLoading) {
      return (
        <div className="Charts-container">
          <div className="loading-class" data-testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="Charts-container">
          <p className="error-message">
            Something went wrong. Please try again later.
          </p>
        </div>
      )
    }

    return <div className="Charts-container">{this.renderCharts()}</div>
  }
}

Charts.propTypes = {
  districtCode: PropTypes.string.isRequired,
  districtsChart: PropTypes.string.isRequired,
}

export default Charts
