import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './summary.css'

const Summary = () => {
    const {featuredSet} = useUserContext()
    const [title, setTitle] = useState(featuredSet ? featuredSet.title : "")
    const [overview, setOverview] = useState(featuredSet ? featuredSet.overview : "")
    const [paragraphs, setParagraphs] = useState(featuredSet ? featuredSet.paragraphs : [])
    useEffect(() => {
      if (featuredSet) {
        setTitle(featuredSet.title)
        setParagraphs(featuredSet.paragraphs)
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
            <p className="digest__summary__highlevel">Full summary:</p>
            {paragraphs.map((text) => {
                return (                   
                    <>     
                        <p className="digest__summary__paragraph">{text}</p>
                    </>
                )
            })}
        </div>
        </div>
    </div>
    )
}

export default Summary