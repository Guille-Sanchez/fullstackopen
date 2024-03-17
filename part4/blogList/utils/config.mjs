import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGO_URL

export {MONGODB_URL, PORT}
