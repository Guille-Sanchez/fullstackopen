import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import Phonebook from "./models/phonebook.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(cors("*"));
dotenv.config();

morgan.token("response-content", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] :response-content - :response-time ms"
  )
);

/*
const people = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
] */

app.use(express.json());
app.use(express.static("dist"));

app.get("/api/persons", (_request, response, next) => {
  Phonebook.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Phonebook.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).json({ error: "No data found for this search" });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const name = body.name;
  const number = body.number;
  // const id = Math.floor(Math.random() * 10000)

  if (name && number) {
    const newPerson = new Phonebook({ name, number });

    newPerson
      .save()
      .then((savedContact) => {
        response.json(savedContact);
      })
      .catch((error) => next(error));
  } else {
    response.status(400).json({ error: "Name and number are required." });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const name = body.name;
  const number = body.number;

  Phonebook.findOneAndUpdate(
    { name },
    { name, number },
    { new: true, runValidators: true, upsert: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        response.json(updatedUser);
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((resp) => {
      console.log(resp);
      response.status(204).end();
    })
    .catch((error) => next(error));
  // people = people.filter(person => person.id !== id)
});

app.get("/info", (_request, response, next) => {
  Phonebook.find({})
    .count()
    .then((numberEntries) => {
      const requestTime = new Date().toUTCString();

      const htmlResponse = `
          <p>Phone has info for ${numberEntries} people</p>
          <p>${requestTime}</p>
      `;

      response.send(htmlResponse);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
