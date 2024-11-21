import './index.css'

const AboutCovidFaqList = props => {
  const {answer, question} = props

  return (
    <li>
      <p className="AboutCovidFaqList-paragraph">{question}</p>
      <p className="AboutCovidFaqList-blue">{answer}</p>
    </li>
  )
}

export default AboutCovidFaqList
