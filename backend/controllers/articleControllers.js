// articleControllers.js

import Article from '../models/articleModel.js'

// GET /api/stories
const getAllArticles = async (req, res) => {
  try {
    const stories = await Article.find()
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// GET /api/stories/:id
const getarticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (article) {
      res.json(article)
    } else {
      res.status(404).json({ error: 'article not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// POST /api/stories
const createarticle = async (req, res) => {
  try {
    const { user, articleBody } = req.body
    const article = new Article({
      user,
      articleBody
    })
    const createdarticle = await article.save()
    res.status(201).json(createdarticle)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// PUT /api/stories/:id
const updatearticle = async (req, res) => {
  try {
    const { user, articleBody,articleTitle,genre } = req.body
    const article = await Article.findById(req.params.id)
    if (article) {
      article.user = user
      article.articleBody = articleBody
      article.articleTitle = articleTitle
      article.genre = genre

      const updatedarticle = await article.save()
      res.json(updatedarticle)
    } else {
      res.status(404).json({ error: 'article not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// DELETE /api/stories/:id
const deletearticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (article) {
      await article.remove()
      res.json({ message: 'article deleted' })
    } else {
      res.status(404).json({ error: 'article not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const getArticlesByUser = async (req, res) => {
    try {
      const userId = req.params.userId
      const articles = await Article.find({ user: userId })
      res.json(articles)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  }

export {
  getAllArticles,
  getarticleById,
  createarticle,
  updatearticle,
  deletearticle,
  getArticlesByUser
}
