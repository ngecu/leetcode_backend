// routes.js

import express from 'express'
import {
  getAllArticles,
  getarticleById,
  createarticle,
  updatearticle,
  deletearticle,
  getArticlesByUser,
} from '../controllers/articleControllers.js'

const router = express.Router()

router.get('/', getAllArticles)
router.get('/:id', getarticleById)
router.get('/user/:userId', getArticlesByUser)
router.post('/', createarticle)
router.put('/:id', updatearticle)
router.delete('/:id', deletearticle)

export default router
