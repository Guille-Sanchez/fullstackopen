import express from "express";
import morgan from "morgan";
import cors from 'cors'

const app = express()
app.use(cors)

morgan.token('response-content', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] :response-content - :response-time ms'))

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (_request, response)=> {
    response.json(people)
})

app.get('/api/persons/:id', (request , response)=>{
  const id = Number(request.params.id)

  const person = people.find(person => person.id === id)

  if (person) {
      response.json(person)
  }

  response.status(404).json({error: 'No data found for this search'})
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const name = body.name;
    const number = body.number;
    const id = Math.floor(Math.random() * 10000)

    if (name && number) {
      if (people.find(person => person.name === name)) {
        response.status(400).json({ error: 'name must be unique.' }).end();
      } else{
          const newPerson = { name, number, id };
          people.push(newPerson);
          response.json(newPerson).end();
      }
    } else {
        response.status(400).json({ error: 'Name and number are required.' });
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.get('/info', (_request, response) => {
  const numberEntries = people.length;
  const requestTime = new Date().toUTCString()

  const htmlResponse = `
      <p>Phone has info for ${numberEntries} people</p>
      <p>${requestTime}</p>
  `;

  response.send(htmlResponse);
});

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
