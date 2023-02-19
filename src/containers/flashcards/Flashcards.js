import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './flashcards.css'
import {BsGearFill} from 'react-icons/bs'
import {AiOutlineClose, AiFillPlusCircle} from 'react-icons/ai'
import Icon from '../../assets/digest__flashcards__icon.png'
import {MdShuffleOn, MdShuffle} from 'react-icons/md'
import { useUserContext } from '../../contexts/UserContext'
import Logo from '../../assets/digest__logo.png'

const Flashcards = () => {
  // const dummyData = [
  //   {term: "Donald Trump", def: "45th President of the United States"},
  //   {term: "Joe Biden", def: "46th President of the United States"},
  //   {term: "Barack Obama", def: "44th President of the United States"},
  //   {term: "George W. Bush", def: "43rd President of the United States"},
  //   {term: "Bill Clinton", def: "42nd President of the United States"},
  //   {term: "George H. W. Bush", def: "41st President of the United States"},
  //   {term: "Ronald Reagan", def: "40th President of the United States"},
  //   {term: "Jimmy Carter", def: "39th President of the United States"},
  //   {term: "Gerald Ford", def: "38th President of the United States"},
  //   {term: "Richard Nixon", def: "37th President of the United States"},
  //   {term: "Lyndon B. Johnson", def: "36th President of the United States"},
  //   {term: "John F. Kennedy", def: "35th President of the United States"},
  // ]
  const navigate = useNavigate()
  const {featuredSet} = useUserContext()
  const [isSettingsMenuShowing, setIsSettingsMenuShowing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDefinition, setShowDefinition] = useState(false)
  const [termShowing, setTermShowing] = useState(true)
  const [isShuffled, setIsShuffled] = useState(false)
  const [showTermFirst, setShowTermFirst] = useState(true)
  const [flashcards, setFlashcards] = useState(!featuredSet.cards ? [] : featuredSet.cards)

  useEffect(() => {
    if (isShuffled) {
      setFlashcards(flashcards.sort(() => Math.random() - 0.5))
    } else {
      setFlashcards(flashcards)
    }
  }, [isShuffled])
  

  useEffect(() => {
    const progressBar = document.querySelector('.flashcards__progress-bar');
    progressBar.style.background = `linear-gradient(to right, #5926ff ${(currentIndex + 1) * 100 / flashcards.length}%, #ddd ${(currentIndex + 1) * 100 / flashcards.length}%)`;
  }, [currentIndex, flashcards]);
  
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowDefinition(false)
      setTermShowing(showTermFirst)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowDefinition(false)
      setTermShowing(showTermFirst)
    }
  }

  const handleFlip = () => {
    setTermShowing(!termShowing);
    setShowDefinition(false);
    document.querySelector('.flashcards__card__content').classList.toggle('flipped');
  };
  

  const handleSaveClick = () => {
    setIsSettingsMenuShowing(false)
  }

  return (
    <div className="flashcards flex__col">
      <div className="flashcards__navbar">
        <div className="flashcards__navbar__logo">
        <img onClick={() => navigate("/")} src={Logo} alt="logo" />
        </div>
        <div className="flashcards__navbar__set-info flex__col ac">
          <h1>{featuredSet && featuredSet.title}</h1>
          <p>{currentIndex + 1} / {flashcards.length}</p>
        </div>
        <div className="flashcards__navbar__link flex__row ac">
          <span onClick={() => navigate("/create")}>
            <AiFillPlusCircle size="50"></AiFillPlusCircle>
          </span>
          <span onClick={() => navigate("/home")}>
            <h3>Your Sets</h3>
          </span>
        </div>
      </div>
      <div className="flashcards__progress-bar" style={{ 
        height: "10px",
        width: "100%",
        marginTop: "80px",
      }}></div>
      <div className="flashcards__settings flex__col">
        <button onClick={() => setIsSettingsMenuShowing(true)}><BsGearFill size="40"/></button>
      </div>
      <div className="flashcards__card flex__col ac">
        <div className="flashcards__card__content flex__col ac jc" onClick={handleFlip}>
            {/* <button onClick={handleStar}>{starred ? <AiFillStar size="30"/> : <AiOutlineStar size="30"/>}</button> */}
          <div className="flashcards__card__term">
            {showTermFirst ? <h2>{flashcards[currentIndex][termShowing ? "term" : "def"]}</h2> : <h2>{flashcards[currentIndex][termShowing ? "term" : "def"]}</h2>}
          </div>
          <p>{termShowing ? "(Term)" : "(Definition)"}</p>
        </div>
        <div className="flashcards__card__buttons flex__row ac">
          <div className="flashcards__shuffle-btn__column flex__col ac">
            <button onClick={() => setIsShuffled(!isShuffled)} className='flashcards__card__shuffle-btn'>{isShuffled ? <MdShuffleOn size="50"/> : <MdShuffle size="50"/>}</button>
            <p>Shuffle {isShuffled ? "On" : "Off"}</p>
          </div>
          <button className="flashcards__card__prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
          <button className="flashcards__card__next-btn" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next</button>
        </div>
      </div>
      {isSettingsMenuShowing && <div className="flashcards__settings-menu flex__col">
        <div className="flashcards__settings-menu__row__header flex__row">
          <h1 className="flashcards__settings-menu__header">Preferences</h1>
          <span><AiOutlineClose size="30" onClick={() => setIsSettingsMenuShowing(false)}/></span>
        </div>
        <div className="flashcards__settings-menu__row flex__col">
          <h2>Shuffle</h2>
          <div className="flashcards__settings-menu__toggle row">
            <button onClick={() => setIsShuffled(true)} className={!isShuffled ? "flashcards__settings-menu__toggle-btn" : "flashcards__settings-menu__toggle-btn flashcards__settings-menu__toggle-btn-active"}>On</button>
            <button onClick={() => setIsShuffled(false)} className={isShuffled ? "flashcards__settings-menu__toggle-btn" : "flashcards__settings-menu__toggle-btn flashcards__settings-menu__toggle-btn-active"}>Off</button>
          </div>
        </div>
        <hr />
        <div className="flashcards__settings-menu__row flex__col">
          <h2>Answer With</h2>
          <div className="flashcards__settings-menu__toggle row">
            <button onClick={() => setShowTermFirst(true)} className={!showTermFirst ? "flashcards__settings-menu__toggle-btn" : "flashcards__settings-menu__toggle-btn flashcards__settings-menu__toggle-btn-active"}>Defintion</button>
            <button onClick={() => setShowTermFirst(false)} className={showTermFirst ? "flashcards__settings-menu__toggle-btn" : "flashcards__settings-menu__toggle-btn flashcards__settings-menu__toggle-btn-active"}>Term</button>
          </div>
        </div>
        <div className="flashcards__settings-menu__save">
          <button onClick={() => handleSaveClick()}>Save</button>
        </div>
      </div>}
      {isSettingsMenuShowing && <div className="overlay"></div>}
    </div>
  )
}

export default Flashcards