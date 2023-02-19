import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './bpsummary.css'

const BPSummary = () => {
    const dummyData =  [
        "One of the benefits of being short is that you may have a lower risk of certain health conditions..",
        "Another potential benefit of being short is that you may have an easier time fitting into small spaces or finding clothing that fits.",
        "Shorter people may also have an advantage in certain sports, such as gymnastics, diving, or rock climbing.",
        "Being short can also be an advantage in certain professions. For example, if you're a pilot or astronaut, being shorter may be an advantage because it can make it easier to fit into tight spaces or maneuver equipment.",
        "Finally, being short may be beneficial for your lifespan. Some studies suggest that shorter people may have a longer lifespan than taller people. This may be because shorter individuals tend to have lower levels of insulin-like growth factor 1 (IGF-1), which has been linked to a higher risk of cancer and other health conditions. While height is just one factor that affects your overall health and lifespan, being short may be one small advantage."
        ]
    const {featuredSet} = useUserContext()
    const [title, setTitle] = useState(featuredSet ? featuredSet.title : "")
    const [bulletPoints, setBulletPoints] = useState(featuredSet ? featuredSet.bps : [])
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
            <p className="digest__summary__onesentence">Being short has many benefits including better health outcomes and increased athletic performance.</p>
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