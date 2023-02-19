import React from 'react'
import './loading.css'
import LoadingGIF from '../../assets/digest__loading.gif'

const Loading = () => {
  return (
    <div className="loading flex__col ac jc">
      <img src={LoadingGIF} alt="loading" />
      <p className="loading__text">Generating...</p>
    </div>
  )
}

export default Loading