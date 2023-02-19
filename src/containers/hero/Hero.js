import React, { useEffect } from 'react'
import './hero.css'
import HeroGraphic from '../../assets/digest__hero-graphic.png'

const Hero = () => {
  useEffect(() => {
    fetch("/api").then(
      res => res.json()
    ).then(
      data => console.log(data)
    )
  }, [])
  
  return (
    <div className="digest__hero section__margin section__padding flex__col">
        <h1 className="gradient__text digest__hero__header">Study in bite-sized chunks.</h1>
        <h2 className="digest__hero__subheader">Create customizable study tools in minutes from any article link or text, audio, or video file.</h2>
        <img className="digest__hero__image" src={HeroGraphic} alt="delete_later"/>
    </div>
  )
}

export default Hero