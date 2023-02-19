import React from 'react'
import './gradedtfqcard.css'

const GradedTFQCard = ({question, correct, idx, total, answer}) => {
    const isCorrect = (answer) => {
        if (answer === correct ) {
          return true
        } else {
          return false
        }
    }
    const choices = ["True", "False"]

    const congratsPhrases = ["Great job!", "You're a genius!", "You're a star!", "You're a champ!", "You're a legend!", "You're a rockstar!", "You're a superstar!", "You're a wizard!"]
    const encouragingPhrases = ["You got it next time!", "Almost, keep trying!", "Keep at it!", "Mistakes are fine, keep going!", "You'll get it next time!"]
    const generateRandomCongratsPhrase = () => {
        const randomIdx = Math.floor(Math.random() * congratsPhrases.length)
        return congratsPhrases[randomIdx]
    }

    const generateRandomEncouragingPhrase = () => {
        const randomIdx = Math.floor(Math.random() * encouragingPhrases.length)
        return encouragingPhrases[randomIdx]
    }
    return (
      <div className="gmcq__card flex__col">
        <div className="mcaq__card__header-row flex__row ac">
          <p>{idx + 1} / {total}</p>
        </div>
        <div className="gmcq__card__question">
          <h1>{question}</h1>
        </div>
        <div className="gmcq__card__choices">
          <div className="gmcq__card__choices__container">
            {/* if the answer is A and it is correct, then add the class gmcq__card__choices__container__choice-correct, if it's not correct but it's A, then add the class gmcq__card__choices__container-incorrect, else make it the default class */}
            {choices.map((choice) => {
                return (
                    <div className={(answer === choice) && isCorrect(answer) 
                ? "gmcq__card__choices__container__choice gmcq__card__choices__container__choice-correct" 
                : answer === choice && !isCorrect(answer) 
                ? "gmcq__card__choices__container__choice gmcq__card__choices__container__choice-incorrect" 
                : "gmcq__card__choices__container__choice"
                }>{choice}
            </div>
                )
            })}
          </div>
        </div>
        <div>
            {isCorrect(answer) ?  <h1 className="gmcq__card__congrats">{generateRandomCongratsPhrase()}</h1>: <h1 className="gmcq__card__correct-answer">{generateRandomEncouragingPhrase()}</h1>}
        </div>
      </div>
    )
}

export default GradedTFQCard