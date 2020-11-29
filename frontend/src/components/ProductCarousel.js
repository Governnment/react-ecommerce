import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Alert from './Alert'
import { listSlides } from '../actions/sliderActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const slidesList = useSelector((state) => state.slidesList)
  const { loading, error, slides } = slidesList

  const slidesDetails = useSelector((state) => state.slidesDetails)
  const { slide } = slidesDetails

  useEffect(() => {
    dispatch(listSlides())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert varaint='danger'>{error}</Alert>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {slides.map((slide) => (
        <Carousel.Item key={slide._id}>
          <Link to={`/product/${slide.link}`}>
            <Image src={slide.image} alt={slide.title} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>{slide.title}</h2>
              <p className='text-dark py-3'>{slide.secondTitle}</p>
              <div className='carousel-inline-btn carousel-btns'>
                <Link to={`/product/${slide.link}`}>
                  <span className='mr-3'>Learn more</span>
                </Link>
                <button className='btn-primary'>Shop now</button>
              </div>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
