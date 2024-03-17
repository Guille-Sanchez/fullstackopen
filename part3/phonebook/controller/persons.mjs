import Phonebook from "./models/phonebook.mjs"
import { Router } from "express"

Router.get("/api/persons", (_request, response, next) => {
  Phonebook.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

Router.get("/api/persons/:id", (request, response, next) => {
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

Router.post("/api/persons", (request, response, next) => {
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

Router.put("/api/persons/:id", (request, response, next) => {
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

Router.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((resp) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

export { Router }
