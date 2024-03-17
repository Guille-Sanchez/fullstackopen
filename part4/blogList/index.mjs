import express from 'express'
import cors from 'cors'
import {blogRouter} from './controller/blog.mjs'
import {PORT} from './utils/config.mjs'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.send('Hello world')
})

app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
