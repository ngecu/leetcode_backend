import express from 'express'
const router = express.Router()
import {
  downloadImage,
} from '../controllers/imageControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(downloadImage)

export default router
