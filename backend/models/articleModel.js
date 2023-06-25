import mongoose from 'mongoose'


const articleSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    articleBody: {
      type: String,
      required: true,
    },
    genre:{
      type:String
    },
    
    articleTitle:{
      type: String,
      required: true,
    }

  },
  {
    timestamps: true,
  }
)

const Article = mongoose.model('Article', articleSchema)

export default Article
