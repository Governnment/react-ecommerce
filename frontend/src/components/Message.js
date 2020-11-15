import React from 'react'
import { Row } from 'react-bootstrap'
import errorAnimation from '../video/404-Animation.mp4'

const Message = ({ children }) => {
  return (
    <Row>
      <div className='message'>
        <video className='errorAnimation' autoPlay muted>
          <source src={errorAnimation} type='video/mp4' />
        </video>
        <div className='errorText'>
          <h4>Cap we got a problem here</h4>
          <h3 className='errorLog'>{children}</h3>
        </div>
      </div>
    </Row>
  )
}

export default Message
