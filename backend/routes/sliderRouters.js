import express from 'express'
const router = express.Router()
import { createSlide } from '../controllers/sliderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, createSlide)

export default router
