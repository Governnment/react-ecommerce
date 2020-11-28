import asyncHandler from 'express-async-handler'

import Slide from '../models/sliderSchema.js'

//? @desk     Fetch all slides
//? @rout     GET /api/slides
//? @access   Public

const getSlides = asyncHandler(async (req, res) => {
  const slides = await Slide.find({})
  res.json({ slides })
})

//? @desk     Fetch a slide by ID
//? @rout     GET /api/slides/:id
//? @access   Public

const getSlideById = asyncHandler(async (req, res) => {
  const slide = await Slide.findById(req.params.id)

  if (slide) {
    res.json(slide)
  } else {
    res.status(404)
    throw new Error('Slide not found')
  }
})

//? @desk     Create a slide
//? @rout     POST /api/slider
//? @access   Private/Admin

const createSlide = asyncHandler(async (req, res) => {
  const slide = new Slide({
    title: 'Sample title',
    secondTitle: 'Sample second title',
    link: 'semple-link',
    button: 'semple-button-text',
    image: '/images/sample.jpg',
  })

  const createSlide = await slide.save()
  res.status(201).json(createSlide)
})

export { getSlides, getSlideById, createSlide }
