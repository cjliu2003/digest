import React, { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './navbar.css'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/digest__logo.png'


const Navbar = () => {
  const {user, logoutUser} = useUserContext()
  const navigate = useNavigate()
  const handleCreateClick = () => {
    navigate("/create")
  }

  const handleHomeClick = () => {
    navigate("/home")
  }

  const handleSignOut = () => {
    setIsUserMenuActive(false)
    logoutUser()
    navigate("/")
  }
  const [isUserMenuActive, setIsUserMenuActive] = useState(false)
  return (
    <div className="digest__navbar flex__row">
        <div className="digest__navbar__logo">
          <img onClick={() => navigate("/")} src={Logo} alt="logo" />
        </div>
        <div className="digest__navbar__sign flex__row ac">
            {user && <span className="digest__navbar__create-btn" onClick={handleHomeClick}><h1>Your Sets</h1></span>}
            {user && <span className="digest__navbar__create-btn" onClick={handleCreateClick}><AiFillPlusCircle size="57px"/></span>}
            {user ? 
              <h1 onClick={() => setIsUserMenuActive(!isUserMenuActive)} className="digest__navbar__icon flex__col">{user && user.email.slice(0,1)}</h1> 
            : <a href="/signin">Sign In</a>
            }
        </div>
        {isUserMenuActive && <div className="digest__navbar__user-menu flex__col">
          <h1>Logged in: {user && user.email}</h1>
          <button onClick={() => handleSignOut()}>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Navbar