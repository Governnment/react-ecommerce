import React from 'react'
import errorAnimation from '../video/404-Animation.mp4'

const Message = ({ children }) => {
  return (
    <div>
      <video className='errorAnimation' autoPlay loop muted>
        <source src={errorAnimation} type='video/mp4' />
      </video>
      <div className='errorText'>
        <h4>Cap we got a problem here</h4>
        <h3 className='errorLog'>{children}</h3>
      </div>
    </div>
  )
}

export default Message
