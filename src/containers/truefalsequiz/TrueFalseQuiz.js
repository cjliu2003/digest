import React, { useEffect, useState } from 'react'
import './truefalsequiz.css'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { GradedTFQCard, GradeVisual, TFQCard } from '../../components'
import { useUserContext } from '../../contexts/UserContext'
import Logo from '../../assets/digest__logo.png'
const TrueFalseQuiz = () => {

    const {featuredSet} = useUserContext()
    const [quiz, setQuiz] = useState(featuredSet ? featuredSet.tfquestions : [])
    useEffect(() => {
      if (featuredSet) {
        setQuiz(featuredSet.tfquestions)
      }
    }, [featuredSet])
    
    const navigate = useNavigate()
    const quizAnswers = new Array(quiz.length).fill(null)
    const [answers, setAnswers] = useState(quizAnswers)
    const [quizGraded, setQuizGraded] = useState(false)
    const [isConfirmTestPopupOpen, setIsConfirmTestPopupOpen] = useState(false)
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

    const handleSubmit = () => {
        setIsConfirmTestPopupOpen(true)
    }

    const handleConfirmSubmit = () => {
        setIsConfirmTestPopupOpen(false)
        setQuizGraded(true)
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
  return (
    <div className="tfq">
        <div className="tfq__navbar">
            <div className="tfq__navbar__logo">
                <img onClick={() => navigate("/")} src={Logo} alt="logo" />
            </div>
            <div className="tfq__navbar__set-info flex__col">
                <h1>{featuredSet && featuredSet.title}: True/False Test</h1>
                <h2>{quiz.length} Questions</h2>
                <h2></h2>
            </div>
            <div className="tfq__navbar__link flex__row ac">
                <span onClick={() => navigate("/create")}>
                    <AiFillPlusCircle size="50"></AiFillPlusCircle>
                </span>
                <span onClick={() => navigate("/home")}>
                    <h3>Your Sets</h3>
                </span>
            </div>
        </div>
        <div className="tfq__questions__container flex__col ac">
            {quizGraded && <GradeVisual 
                numCorrect={calculateScore()} 
                total={quiz.length}/>
            }
            {quiz.map((q, idx) => {
                return (
                    <>
                    {!quizGraded ? 
                    <TFQCard 
                        question={q.question}
                        correct={q.correct}
                        idx={idx}
                        total={quiz.length}
                        setAnswer={setAnswer}
                        answers={answers}
                    />
                    : <GradedTFQCard 
                        question={q.question}
                        correct={q.correct}
                        idx={idx}
                        total={quiz.length}
                        answer={answers[idx]}
                    />}
                    </>
                )
            })}
        </div>
        {!quizGraded ?
            <div className="tfq__submit-container flex__col ac">
            <h1>All Done? Submit your quiz below! </h1>
            <button onClick={() => handleSubmit()} className="tfq__submit-container__button">Submit</button>
            </div> : 
            <div className="tfq__submit-container flex__col ac">
            <h1>Have more things to study? </h1>
            <button onClick={() => navigate('/create')} className="tfq__submit-container__button">Create Another</button>
            </div>
        }
        {isConfirmTestPopupOpen && <div className="tfq__confirm-popup flex__col">
            {answers.includes(null) ? <h1>Oops! You missed a question.</h1> : <h1>Do you want to review any of your answers?</h1>}
            <div className="tfq__confirm-popup__button-row flex__row ac">
            <button className="tfq__confirm__review-btn" onClick={() => setIsConfirmTestPopupOpen(false)}>Review Answers</button>
            <button className="tfq__confirm__submit-btn" onClick={() => handleConfirmSubmit()}>Submit Quiz {answers.includes(null) && "Anyways"}</button>
            </div>
        </div>}
        {isConfirmTestPopupOpen && <div className="overlay"></div>}
    </div>
  )
}

export default TrueFalseQuiz