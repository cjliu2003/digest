import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './bpsummary.css'

const BPSummary = () => {
    const {featuredSet} = useUserContext()
    const [title, setTitle] = useState(featuredSet ? featuredSet.title : "")
    const [bulletPoints, setBulletPoints] = useState(featuredSet ? featuredSet.bps : [])
    const [overview, setOverview] = useState(featuredSet ? featuredSet.overview : "")
    useEffect(() => {
        if (featuredSet) {
            setTitle(featuredSet.title)
            setBulletPoints(featuredSet.bps)
        }
    }, [featuredSet])
    
  return (
    <div className="digest__summary section__margin section__padding flex__col ac">
        <div className="digest__text_container">
        <div className="digest__summary__header__container">
            <div className="digest__summary__header">
                <h1>{title}</h1>
            </div>
            <div className="digest__summary__header">
                <h2>Summary</h2>
            </div>
        </div>
        <div className="digest__summary__highlevel__container"> 
            <p className="digest__summary__highlevel">What you need to know:</p>
            <p className="digest__summary__onesentence">{overview}</p>
        </div>
        <div className="digest__summary__paragraphs">
            <p className="digest__summary__highlevel">Full bullet point summary:</p>
            {bulletPoints.map((text) => {
                return (                   
                    <>     
                        <li className="digest__summary__bpparagraph">{text}</li>
                    </>
                )
            })}
        </div>
        </div>
    </div>
    )
}

export default BPSummary