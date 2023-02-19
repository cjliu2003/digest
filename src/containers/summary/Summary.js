import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './summary.css'

const Summary = () => {
    // const dummyData =  [
    //     "One of the benefits of being short is that you may have a lower risk of certain health conditions. For example, studies suggest that shorter individuals may be less likely to develop heart disease, type 2 diabetes, and some forms of cancer. This may be because shorter people tend to have lower levels of certain hormones and less strain on their organs.",
    //     "Another potential benefit of being short is that you may have an easier time fitting into small spaces or finding clothing that fits. If you're someone who loves to travel or explore tight spaces, being shorter may be advantageous. Additionally, children who are shorter may have an easier time finding clothes and shoes that fit them, which can save parents time and money.",
    //     "Shorter people may also have an advantage in certain sports, such as gymnastics, diving, or rock climbing. These sports require a lower center of gravity, which can be an advantage for shorter individuals. In addition, shorter people may be able to move more quickly and easily through tight spaces or over obstacles, which can be beneficial in many sports and activities.",
    //     "Being short can also be an advantage in certain professions. For example, if you're a pilot or astronaut, being shorter may be an advantage because it can make it easier to fit into tight spaces or maneuver equipment. Additionally, shorter people may have an easier time finding jobs that require them to crawl or work in small spaces, such as plumbers, electricians, or mechanics.",
    //     "Finally, being short may be beneficial for your lifespan. Some studies suggest that shorter people may have a longer lifespan than taller people. This may be because shorter individuals tend to have lower levels of insulin-like growth factor 1 (IGF-1), which has been linked to a higher risk of cancer and other health conditions. While height is just one factor that affects your overall health and lifespan, being short may be one small advantage."
    // ]
    const {featuredSet} = useUserContext()
    const [title, setTitle] = useState(featuredSet ? featuredSet.title : "")
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
            <p className="digest__summary__onesentence">This is a one sentence summary of the text above.</p>
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