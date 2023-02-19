import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './multiplechoicequiz.css'
import {AiFillPlusCircle} from 'react-icons/ai'
import Icon from '../../assets/digest__flashcards__icon.png'
import { GradedMCQCard, GradeVisual, MCQCard } from '../../components'
import { useUserContext } from '../../contexts/UserContext'
import Logo from '../../assets/digest__logo.png'

const MultipleChoiceQuiz = () => {
  // const dummyData = [
  //   {question: "What is the capital of California?", A: "Sacramento", B: "San Francisco", C: "Los Angeles", D: "San Diego", correct: "A"},
  //   {question: "What is the capital of New York?", A: "New York City", B: "Albany", C: "Buffalo", D: "Rochester", correct: "B"},
  //   {question: "What is the capital of Texas?", A: "Houston", B: "Dallas", C: "Austin", D: "San Antonio", correct: "C"},
  //   {question: "What is the capital of Florida?", A: "Miami", B: "Tampa", C: "Orlando", D: "Tallahassee", correct: "D"},
  //   {question: "What is the capital of Illinois?", A: "Chicago", B: "Springfield", C: "Peoria", D: "Rockford", correct: "B"}
  // ]
  const {featuredSet} = useUserContext()
  useEffect(() => {
    if (featuredSet) {
      setQuiz(featuredSet.mcquestions)
    }
  }, [featuredSet])
  
  
  const [quiz, setQuiz] = useState(featuredSet ? featuredSet.mcquestions : [])
  const quizAnswers = new Array(quiz.length).fill(null)
  const [answers, setAnswers] = useState(quizAnswers)
  const [isConfirmTestPopupOpen, setIsConfirmTestPopupOpen] = useState(false)
  const [quizGraded, setQuizGraded] = useState(false)

  const setAnswer = (idx, answer) => {
    const newAnswers = [...answers]
    newAnswers[idx] = answer
    setAnswers(newAnswers)
  }
  useEffect(() => {
    if (isConfirmTestPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isConfirmTestPopupOpen]);

  const navigate = useNavigate()

  const handleSubmit = () => {
    setIsConfirmTestPopupOpen(true)
  }

  const calculateScore = () => {
    let score = 0
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === quiz[i].correct) {
        score++
      }
    }
    return score
  }

  const handleConfirmSubmit = () => {
    setIsConfirmTestPopupOpen(false)
    setQuizGraded(true)
  }
  return (
    <div>
      <div className="mcq__navbar">
        <div className="mcq__navbar__logo">
        <img onClick={() => navigate("/")} src={Logo} alt="logo" />
        </div>
        <div className="mcq__navbar__set-info flex__col">
          <h1>CS103 Midterm 2: Multiple Choice Test</h1>
          <h2>{quiz.length} Questions</h2>
          <h2></h2>
        </div>
        <div className="mcq__navbar__link flex__row ac">
          <span onClick={() => navigate("/create")}>
            <AiFillPlusCircle size="50"></AiFillPlusCircle>
          </span>
          <span onClick={() => navigate("/home")}>
            <h3>Your Sets</h3>
          </span>
        </div>
      </div>
      <div className="mcq__questions-container flex__col ac">
        {quizGraded && <GradeVisual
          numCorrect={calculateScore()}
          total={quiz.length}
        />}
        {quiz.map((q, idx) => {
          return (
            <>
            {!quizGraded ? 
            <MCQCard 
              question={q.question}
              A={q.A}
              B={q.B}
              C={q.C}
              D={q.D}
              idx={idx}
              total={quiz.length}
              setAnswer={setAnswer}
              answers={answers}
            />
            : 
            <GradedMCQCard
              question={q.question}
              A={q.A}
              B={q.B}
              C={q.C}
              D={q.D}
              idx={idx}
              total={quiz.length}
              correct={q.correct}
              answers={answers}
            />
            }
            </>
          )
        })}
      </div>
      {!quizGraded ?
        <div className="mcq__submit-container flex__col ac">
          <h1>All Done? Submit your quiz below! </h1>
          <button onClick={() => handleSubmit()} className="mcq__submit-container__button">Submit</button>
        </div> : 
        <div className="mcq__submit-container flex__col ac">
           <h1>Have more things to study? </h1>
          <button onClick={() => navigate('/create')} className="mcq__submit-container__button">Create Another</button>
        </div>
      }
      {isConfirmTestPopupOpen && <div className="mcq__confirm-popup flex__col">
        {answers.includes(null) ? <h1>Oops! You missed a question.</h1> : <h1>Do you want to review any of your answers?</h1>}
        <div className="mcq__confirm-popup__button-row flex__row ac">
          <button className="mcq__confirm__review-btn" onClick={() => setIsConfirmTestPopupOpen(false)}>Review Answers</button>
          <button className="mcq__confirm__submit-btn" onClick={() => handleConfirmSubmit()}>Submit Quiz {answers.includes(null) && "Anyways"}</button>
        </div>
      </div>}
      {isConfirmTestPopupOpen && <div className="overlay"></div>}
    </div>
  )
}

export default MultipleChoiceQuiz
