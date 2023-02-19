import React from 'react'
import './App.css'
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { About, Create, Flashcards, Mission, Faq, Footer, Hero, Home, Navbar, MultipleChoiceQuiz, SignIn, SignUp, Summary, TrueFalseQuiz, BPSummary } from './containers'
import { UserContextProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserContextProvider>
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Navbar />
                        <Hero />
                        <Mission />
                        <About />
                        <Faq />
                        <Footer/>
                    </div>
                }/>
                <Route path="/signin" element={
                    <div>
                        <SignIn/>
                    </div>
                }/>
                <Route path="/about" element={
                    <div>
                        <Navbar />
                        <About/>
                        <Footer/>
                    </div>
                }/>
                <Route path="/signup" element={
                    <div>
                        <SignUp/>
                        
                    </div>
                }/>
                <Route path="/home" element={
                    <div>
                        <Navbar />
                        <Home/>
                        <Footer/>
                    </div>
                }/>
                <Route path="/create" element={
                    <div>
                        <Navbar />
                        <Create />
                        <Footer/>
                    </div>
                }/>
                <Route path="/summary" element={
                    <div>
                        <Navbar />
                        <Summary />
                        <Footer/>
                    </div>
                }/>
                <Route path="/bp-summary" element={
                    <div>
                        <Navbar />
                        <BPSummary />
                        <Footer/>
                    </div>
                }/>
                <Route path="/flashcards" element={
                    <div>
                        <Flashcards />
                    </div>
                }/>
                <Route path="/multiplechoicequiz" element={
                    <div>
                        <MultipleChoiceQuiz />
                        <Footer/>
                    </div>
                }/>
                <Route path="/truefalsequiz" element={
                    <div>
                        <TrueFalseQuiz />
                        <Footer/>
                    </div>
                }/>
                
            </Routes>
        </Router>
    </UserContextProvider>
  )
}

export default App