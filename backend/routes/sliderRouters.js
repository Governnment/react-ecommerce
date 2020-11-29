import express from 'express'
const router = express.Router()
import {
  getSlides,
  getSlideById,
  createSlide,
  updateSlide,
} from '../controllers/sliderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getSlides).post(protect, admin, createSlide)
router.route('/:id').get(getSlideById).put(protect, admin, updateSlide)

export default router
