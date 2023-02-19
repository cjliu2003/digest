import React from 'react'
import './mission.css'

const Mission = () => {
    const missionText = [
        "digest.AI is a platform built by and for students. We're working at the intersection of artifical intelligence and education to create the future of studying.",
        "Students can input any text, audio, video, or image file and create a study tool of their choosing in minutes. Rather than hoping study guides already exist for their course material, digest.AI allows students to create study tools on exactly what they want, how they want, when they want"
    ]
    return (
    <div className="digest__mission__bg">
      <div className="digest__mission section__margin section__padding flex__col ac">
        <div className="digest__mission__header">
          <h1>Mission</h1>
        </div>
        <div className="digest__about">
          {missionText.map((text) => {
            return (
              <p>{text}</p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Mission