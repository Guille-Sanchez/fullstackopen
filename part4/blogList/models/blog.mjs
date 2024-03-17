import mongoose from 'mongoose'
import {MONGODB_URL} from '../utils/config.mjs'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URL)

export {Blog}
