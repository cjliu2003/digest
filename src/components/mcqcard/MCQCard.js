import React from 'react'
import './mcqcard.css'
const MCQCard = ({question, A, B, C, D, setAnswer, idx, total, answers}) => {
  const handleChoiceClick = (choice) => {
    setAnswer(idx, choice)
  }
  return (
    <div className="mcq__card flex__col">
      <div className="mcaq__card__header-row flex__row ac">
        <p>{idx + 1} / {total}</p>
      </div>
      <div className="mcq__card__question">
        <h2>Question</h2>
        <h1>{question}</h1>
      </div>
      <div className="mcq__card__choices">
        <div className="mcq__card__choices__container">
          <div onClick={() => handleChoiceClick("A")} className={answers[idx] === "A" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>{A}</div>
          <div onClick={() => handleChoiceClick("B")} className={answers[idx] === "B" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>{B}</div>
          <div onClick={() => handleChoiceClick("C")} className={answers[idx] === "C" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>{C}</div>
          <div onClick={() => handleChoiceClick("D")} className={answers[idx] === "D" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>{D}</div>
        </div>
      </div>
    </div>
  )
}

export default MCQCard