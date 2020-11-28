import asyncHandler from 'express-async-handler'

import Carousel from '../models/carouselModel.js'

//? @desk     Create a slide
//? @rout     POST /api/slider
//? @access   Private/Admin

const createSlide = asyncHandler(async (req, res) => {
  const carousel = new Carousel({
    title: 'Sample title',
    secondTitle: 'Sample second title',
    link: 'semple-link',
    button: 'semple-button-text',
    image: '/images/sample.jpg',
  })

  const createSlide = await carousel.save()
  res.status(201).json(createSlide)
})

export { createSlide }
