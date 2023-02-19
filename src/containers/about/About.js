import React from 'react'
import './about.css'
import MacMockup from '../../assets/digest__mac-mockup.png'

const About = () => {
  const aboutText = [
    "As busy students, we know how tedious and time-consuming it can be to create your study guides and search for ones online that match you course material.",
    "So why waste time doing this grunt work when you can spend it actively learning and studying material. digest.AI is here to bring the power of AI to your study habits.",
  ]
  return (
    <div className="digest__about section__margin section__padding flex__col">
      <div className="digest__about__header">
        <h1>We're here to help you learn!</h1>
      </div>
      <div className="digest__about__container flex__row ac">
        <div className="digest__about__graphic">
          <img src={MacMockup} alt="Mac Mockup"/>
        </div>
        
        <div className="digest__about">
          {aboutText.map((text) => {
            return (
              <p>{text}</p>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default About