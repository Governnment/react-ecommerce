import React from 'react'
import { Row } from 'react-bootstrap'
import errorIllustration from '../Images/illustrations/clip-page-not-found.png'

const Message = ({ children }) => {
  return (
    <Row>
      <div className='message'>
        <img
          className='w-50 mx-auto d-block error-mobile'
          src={errorIllustration}
          alt='error'
        />
        <div className='errorText'>
          <h4>Cap we got a problem here</h4>
          <h3 className='errorLog'>{children}</h3>
        </div>
      </div>
    </Row>
  )
}

export default Message
