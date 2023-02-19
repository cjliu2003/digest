import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import './signup.css'

const SignUp = () => {
    const { registerUser, user } = useUserContext()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (user) navigate("/home")
    }, [])
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  
    const handleSignIn = () => {
      if (email === "" || password === "" || confirmPassword === "") {
        return alert("Please fill out all fields")
      } else if (password !== confirmPassword) {
        return alert("Passwords do not match")
      } else {
        registerUser(email, password)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      }
    }
  return (
    <div className="digest__signup flex__col">
        <div classNmae="digest__signup__container flex__col">
            <h1 className="digest__signup__header">Sign Up for Digest</h1>
            <div className="digest__signup__input">
                <p>Email</p>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your Email'/>
            </div>
            <div className="digest__signup__input">
                <p>Set Password</p>
                <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder='Enter your Password'/>
            </div>
            <div className="digest__signup__input">
                <p>Confirm Password</p>
                <input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm your Password'/>
            </div>
            <button onClick={() => handleSignIn()} className="digest__signup__button">Sign Up</button>
            <a className="digest__signup__a" href="/signin">Already have an account? Sign in here!</a>
        </div>
    </div>
  )
}

export default SignUp