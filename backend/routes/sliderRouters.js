import express from 'express'
const router = express.Router()
import {
  getSlides,
  getSlideById,
  createSlide,
} from '../controllers/sliderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getSlides).post(protect, admin, createSlide)
router.route('/:id').get(getSlideById)

export default router
