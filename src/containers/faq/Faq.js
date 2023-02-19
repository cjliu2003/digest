import React from 'react'
import './faq.css'

const Faq = () => {
    const faq = [
        {question: "How does it work?", answer: "Digest uses industry-leading AI technology to create customizable study tools based off of the data you upload."},
        {question: "Can study tools be shared?", answer: "Currently, Digest is targeted for personalized, individual study tools. However, we hope that we can soon offer the ability to share study tools with others."},
        {question: "Does it work for all grade levels?", answer: "Yes! Digest is designed to work for all grade levels, from elementary school to college. In fact, you can specify the grade level of your study tool when you create it."},
        {question: "How long does it take?", answer: "On average, it takes less than a minute to create a study tool. However, the time it takes to create a study tool depends on the amount of data you upload."},
        {question: "Why?", answer: "As students, we know how time consuming and tedious it can be to create study tools. We wanted to create a platform that would make the process of creating study tools as easy as possible. Though there is great value in creating your own study tools, we also know that sometimes you just don't have the time. Moreover, technology is advancing at a rapid pace, and we believe that AI technology can be used to create study tools that offer a more personalized and effective learning experience."},
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