import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import { listSlides, createSlide, deleteSlide } from '../actions/sliderActions'
import { SLIDE_CREATE_RESET } from '../constants/sliderConstants'

const SlidesListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const slidesList = useSelector((state) => state.slidesList)
  const { loading, error, slides } = slidesList

  const slideCreate = useSelector((state) => state.slideCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    slide: createdSlide,
  } = slideCreate

  const slideDelete = useSelector((state) => state.slideDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = slideDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: SLIDE_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/slider/${createdSlide._id}/edit`)
    } else {
      dispatch(listSlides(''))
    }
  }, [dispatch, history, userInfo, createdSlide, successCreate, successDelete])

  const createSlideHandler = () => {
    dispatch(createSlide())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSlide(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Slides</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createSlideHandler}>
            <i className='fas fa-plus'></i> Create Slide
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
      {loadingCreate && <Loader />}
      {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>2nd title</th>
                <th>link</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide._id}>
                  <td>{slide._id}</td>
                  <td>{slide.title}</td>
                  <td>{slide.secondTitle}</td>
                  <td>{slide.link}</td>
                  <td>{slide.createdAt}</td>
                  <td>
                    <LinkContainer to={`/admin/slider/${slide._id}/edit`}>
                      <Button variant='light' className='btn-sm fit'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm fit'
                      onClick={() => deleteHandler(slide._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default SlidesListScreen
