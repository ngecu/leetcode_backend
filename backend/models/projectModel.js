import mongoose from 'mongoose'


const projectSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Article',
      }],
    name:{
      type:String
    },
  },
  {
    timestamps: true,
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project
