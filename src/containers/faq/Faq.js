import React from 'react'
import './faq.css'

const Faq = () => {
    const faq = [
        {question: "How does it work?", answer: "Digest uses industry-leading AI technology to create customizable study tools based off of the data you upload."},
        {question: "Can study tools be shared?", answer: "Currently, UNISCRIBE is targeted for personalized, individual study tools. We’re currently developing a platform to allow students and teachers to share study decks."},
        {question: "Does it work for all grade levels?", answer: "Yes! Digest is designed to work for all grade levels, from elementary school to college."},
        {question: "How long does it take?", answer: "On average, it takes <5 minutes to create a study tool."},
        {question: "Is my data stored?", answer: "No, Digest does not store data after your study tool is created and all generation requests are anonymized."},
    ]
  return (
    <div className="digest__faq section__margin section__padding">
        <div className="digest__faq__header">
            <h1>FAQ</h1>
        </div>
        <div className="digest__faq__questions-container">
            {faq.map(q => {
                return (
                    <div className="digest__faq__question">
                        <h1>{q.question}</h1>
                        <p>{q.answer}</p>
                    </div>
                )
            })}
        </div>
     </div>
  )
}

export default Faq