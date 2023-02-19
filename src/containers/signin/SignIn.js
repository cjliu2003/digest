import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import './signin.css'

const SignIn = () => {
  const { signInUserEmail, user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate("/home")
  }, [user])
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = () => {
    if (email === "" || password === "") {
      return alert("Please fill out all fields")
    } else {
      signInUserEmail(email, password)
      setEmail("")
      setPassword("")
      setTimeout(() => {
        navigate("/home")
      }, 1000)
    }
  }
  return (
    <div className="digest__signin flex__col">
        <div classNmae="digest__signin__container flex__col">
            <h1 className="digest__signin__header">Sign In to Digest Account</h1>
            <div className="digest__signin__input">
                <p>Email</p>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your Email'/>
            </div>
            <div className="digest__signin__input">
                <p>Password</p>
                <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder='Enter your Password'/>
            </div>
            <button onClick={() => handleSignIn()} className="digest__signin__button">Sign In</button>
            <a className="digest__signin__a" href="/signup">Don't have an account? Create one here!</a>
        </div>
    </div>
  )
}

export default SignIn