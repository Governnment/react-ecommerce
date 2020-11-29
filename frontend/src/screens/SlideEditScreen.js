import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listSlidesDetails, updateSlide } from '../actions/sliderActions'
import { SLIDE_UPDATE_RESET } from '../constants/sliderConstants'

const SlideEditScreen = ({ match, history }) => {
  const sliderId = match.params.id

  const [title, setTitle] = useState('')
  const [secondTitle, setSecondTitle] = useState('')
  const [link, setLink] = useState('')
  const [button, setButton] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const slidesDetails = useSelector((state) => state.slidesDetails)
  const { loading, error, slide } = slidesDetails

  const slidesList = useSelector((state) => state.slidesList)
  const { slides } = slidesList

  const slideUpdate = useSelector((state) => state.slideUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = slideUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SLIDE_UPDATE_RESET })
      history.push('/admin/slidelist')
    } else {
      if (!slides.title || slides._id !== sliderId) {
        dispatch(listSlidesDetails(sliderId))
      } else {
        setTitle(slides.title)
        setSecondTitle(slides.secondTitle)
        setLink(slides.link)
        setButton(slides.button)
        setImage(slides.image)
      }
    }
  }, [
    dispatch,
    history,
    sliderId,
    slides._id,
    slides.title,
    slides.secondTitle,
    slides.link,
    slides.button,
    slides.image,
    successUpdate,
  ])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateSlide({
        _id: sliderId,
        title,
        secondTitle,
        link,
        button,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/slidelist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Slide</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Alert variant='danger'>{error}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='secondTitle'>
              <Form.Label>Second title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter second title'
                value={secondTitle}
                onChange={(e) => setSecondTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='link'>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='button'>
              <Form.Label>Button</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter button link'
                value={button}
                onChange={(e) => setButton(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default SlideEditScreen
