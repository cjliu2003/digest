import React from 'react'
import './tfqcard.css'

const TFQCard = ({question, idx, total, answers, setAnswer}) => {
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
          <div onClick={() => handleChoiceClick("True")} className={answers[idx] === "True" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>True</div>
          <div onClick={() => handleChoiceClick("False")} className={answers[idx] === "False" ? "mcq__card__choices__container__choice mcq__card__choices__container__choice-active" : "mcq__card__choices__container__choice"}>False</div>

        </div>
      </div>
    </div>
  )
}

export default TFQCard