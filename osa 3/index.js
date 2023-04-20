const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendick",
      "number": "39-23-6423122",
      "id": 4
    }
]


app.get('/api/persons/:id', (request, response) => {    
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()  
    }
})

app.get('/info', (req, res) => {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  res.send(
    `Phonebook has info for ${persons.length} people.
    <br/>
    ${today.toISOString()}
    `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
