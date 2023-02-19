import React from 'react'
import './gradedmcqcard.css'
const GradedMCQCard = ({question, A, B, C, D, correct, idx, total, answers}) => {
    const isCorrect = (answer) => {
        if (answer === correct) {
            return true
        } else {
            return false
        }
    }
    const choices = ["A", "B", "C", "D"]
    const convertToVar = (letter) => {
        if (letter === "A") {
            return A
        } else if (letter === "B") {
            return B
        } else if (letter === "C") {
            return C
        } else if (letter === "D") {
            return D
        }
    }

    const congratsPhrases = ["Great job!", "You're a genius!", "You're a star!", "You're a champ!", "You're a legend!", "You're a rockstar!", "You're a superstar!", "You're a wizard!"]
    const generateRandomCongratsPhrase = () => {
        const randomIdx = Math.floor(Math.random() * congratsPhrases.length)
        return congratsPhrases[randomIdx]
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
                    <div className={answers[idx] === choice && isCorrect(answers[idx]) 
                ? "gmcq__card__choices__container__choice gmcq__card__choices__container__choice-correct" 
                : answers[idx] === choice && !isCorrect(answers[idx]) 
                ? "gmcq__card__choices__container__choice gmcq__card__choices__container__choice-incorrect" 
                : "gmcq__card__choices__container__choice"
                }>{convertToVar(choice)}
            </div>
                )
            })}
          </div>
        </div>
        <div>
            {isCorrect(answers[idx]) ?  <h1 className="gmcq__card__congrats">{generateRandomCongratsPhrase()}</h1>: <h1 className="gmcq__card__correct-answer">Correct Answer: {correct}</h1>}
        </div>
      </div>
    )
  }
  
  export default GradedMCQCard