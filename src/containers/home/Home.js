import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import {AiOutlinePlus} from 'react-icons/ai'
import './home.css'

const Home = () => {
  // const your_set_dummy = [
  //   {title: "CS103 Midterm 2", type: "flashcards", cards: [{term: "term1", def: "def1"}, {term: "term2", def: "def2"},  {term: "term3", def: "def3"}, {term: "term4", def: "def4"}, {term: "term5", def: "def5"}]},
  //   {title: "CS103 Midterm 3", type: "multiple choice quiz"},
  //   {title: "CS103 Midterm 4", type: "summary"},
  //   {title: "CS103 Midterm 5", type: "true/false quiz"},
  //   {title: "CS103 Midterm 6", type: "bullet points"},
  // ]

  const {user, userSets, setFeaturedSet} = useUserContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate("/signin")
  }, [user])
  
  const handleNavigate = (type, data) => {
    console.log(data)
    setFeaturedSet(data)
    switch (type) {
      case "flashcards":
        navigate("/flashcards")
        break;
      case "multiple choice quiz":
        navigate("/multiplechoicequiz")
        break;
      case "summary":
        navigate("/summary")
        break;
      case "true/false quiz":
        navigate("/truefalsequiz")
      break;
      case "bullet points":
        navigate("/bp-summary")
      break;
      default:
        break;
    }
  }
  return (
    <div className="digest__home section__margin section__padding flex__col">
      <div className="digest__home__your-sets">
        <h1>Your Sets</h1>
        <div className='digest__home__your-sets__container'>
          {userSets.map((set, index) => {
            return (
              <div className="digest__home__your-sets__set-container flex__col ac jc" key={index} onClick={() => handleNavigate(set.type, set)}>
                <h2 className="digest__home__your-sets__set-container-title">{set.title}</h2>
                <p className="digest__home__your-sets__set-container-subtitle">{set.type}</p>
                <h3 className="digest__home__your-sets__set-container-date">Created: {set.date}</h3>
              </div>
            )
          })}
          <div className="digest__home__your-sets__set-container flex__col ac jc" onClick={() => navigate("/create")}>
            <AiOutlinePlus size="50px"/>
            <h2 className="digest__home__your-sets__set-container-title">Create New</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home