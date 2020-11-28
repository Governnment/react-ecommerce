import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import TVsHoliday from '../Images/TVs-Holiday-KV-DT-1440x810.jpg'
import GalaxyNote from '../Images/hp-note20-d.jpg'

const ProductCarouselStatic = () => {
  return (
    <Carousel pause='hover' className='bg-dark'>
      <Carousel.Item>
        <Link to={`/product/`}>
          <Image src={TVsHoliday} alt='TVs Holiday' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2>Black Friday TV offers start now</h2>
            <p className='text-dark'>
              Plus, get in-home installation and buy and try select products
              with our <br /> 100-day, risk-free trial.
            </p>
            <button className='btn-primary'>Shop now</button>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={`/product/`}>
          <Image src={GalaxyNote} alt='TVs Holiday' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2>Galaxy Note20 5G</h2>
            <p className='text-dark'>
              Power your work and play like never before. Starting from $6.95
              for 36 months or $249.99 <br />
              with eligible trade-in.ᶿ
            </p>
            <div className='carousel-inline-btn'>
              <Link to={`/product/`}>
                <span>Learn more</span>
              </Link>
              <button className='btn-primary'>Shop now</button>
            </div>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarouselStatic
