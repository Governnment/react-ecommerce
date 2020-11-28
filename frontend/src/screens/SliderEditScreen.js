import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { createSlide } from '../actions/productActions'

const SliderEditScreen = ({ history, carousel }) => {
  const dispatch = useDispatch()

  const slideCreate = useSelector((state) => state.slideCreate)
  const { success: successCreate, slide: createdSlide } = slideCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${carousel._id}/edit`)
    }
  }, [dispatch, history, userInfo, successCreate, createdSlide])

  const createSlideHandler = () => {
    dispatch(createSlide())
  }

  return (
    <Row className='align-items-center'>
      <Col>
        <h1>Slider</h1>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={createSlideHandler}>
          <i className='fas fa-plus'></i> Create Product
        </Button>
      </Col>
    </Row>
  )
}

export default SliderEditScreen
