import Phonebook from "../models/phonebook.mjs"
import { Router } from "express"

const RouterInfo = Router()

RouterInfo.get("/", (_request, response, next) => {
  Phonebook.find({})
    .count()
    .then((numberEntries) => {
      const requestTime = new Date().toUTCString()

      const htmlResponse = `
          <p>Phone has info for ${numberEntries} people</p>
          <p>${requestTime}</p>
      `

      response.send(htmlResponse)
    })
    .catch((error) => next(error))
})

export { RouterInfo }
