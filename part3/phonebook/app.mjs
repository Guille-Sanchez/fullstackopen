import express from "express"
import morgan from "morgan"
import cors from "cors"
import Phonebook from "./models/phonebook.mjs"
import { errorHandler } from "./middlewares/errorHandler.mjs"
import { RouterInfo } from "./controller/info.mjs"

const app = express()
app.use(cors("*"))

morgan.token("response-content", (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ":method :url :status :res[content-length] :response-content - :response-time ms"
  )
)

app.use(express.json())
app.use(express.static("dist"))

app.get("/api/persons", (_request, response, next) => {
  Phonebook.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Phonebook.findById(id)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).json({ error: "No data found for this search" })
      }
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const name = body.name
  const number = body.number

  if (name && number) {
    const newPerson = new Phonebook({ name, number })

    newPerson
      .save()
      .then((savedContact) => {
        response.json(savedContact)
      })
      .catch((error) => next(error))
  } else {
    response.status(400).json({ error: "Name and number are required." })
  }
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const name = body.name
  const number = body.number

  Phonebook.findOneAndUpdate(
    { name },
    { name, number },
    { new: true, runValidators: true, upsert: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        response.json(updatedUser)
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((resp) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.use("/info", RouterInfo)

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)
app.use(errorHandler)

export { app }
