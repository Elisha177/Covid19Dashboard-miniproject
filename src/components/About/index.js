/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import AboutCovidFaqList from '../AboutCovidFaqList'
import AboutCovidFactList from '../AboutCovidFactList'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: [],
    factoidData: [],
    error: false,
  }

  componentDidMount() {
    this.fetchAboutCovidData()
  }

  fetchAboutCovidData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        const factoidData = data.factoids.map(item => ({
          banner: item.banner,
          id: item.id,
        }))
        const faqData = data.faq.map(item => ({
          answer: item.answer,
          category: item.category,
          questionNo: item.qno,
          question: item.question,
        }))

        this.setState({faqData, factoidData, isLoading: false})
      } else {
        this.setState({error: true, isLoading: false})
      }
    } catch {
      this.setState({error: true, isLoading: false})
    }
  }

  renderContent = () => {
    const {faqData, factoidData} = this.state
    return (
      <>
        <ul className="About-about-facts" testid="faqsUnorderedList">
          {faqData.map(item => (
            <AboutCovidFaqList
              answer={item.answer}
              question={item.question}
              key={item.questionNo}
            />
          ))}
        </ul>

        <h1 className="About-heading-class">Factoids</h1>
        <ul className="About-about-facts" testid="factoidsUnorderedList">
          {factoidData.map(item => (
            <AboutCovidFactList banner={item.banner} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, error} = this.state

    if (isLoading) {
      return (
        <div className="About-container">
          <div className="loading-class" testid="aboutRouteLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="About-container">
          <p className="error-message">
            Something went wrong. Please try again later.
          </p>
        </div>
      )
    }

    return (
      <>
        <Header />
        <div className="About-container">
          <div className="About-container-column">
            <h1 className="About-heading">About</h1>
            <p className="About-paragraph">
              Last update on {new Date().toLocaleDateString()}.
            </p>
            <p className="About-heading-class">
              COVID-19 vaccines be ready for distribution
            </p>
          </div>
          {this.renderContent()}
        </div>
        <Footer />
      </>
    )
  }
}

export default About
