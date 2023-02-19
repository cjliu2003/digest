import React from 'react'
import './hero.css'
import HeroGraphic from '../../assets/digest__hero-graphic.png'

const Hero = () => {  
  return (
    <div className="digest__hero section__margin section__padding flex__col">
        <h1 className="gradient__text digest__hero__header">Study in bite-sized chunks.</h1>
        <h2 className="digest__hero__subheader">Create customizable study tools in minutes from video, audio, or PDF file.</h2>
        <img className="digest__hero__image" src={HeroGraphic} alt="delete_later"/>
    </div>
  )
}

export default Hero