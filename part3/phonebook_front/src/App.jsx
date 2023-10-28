import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import axios from 'axios'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [message, setMessage] = useState({state: 'success', message: null})
  const baseUrl = 'https://phonebook-bmxi.onrender.com/api/persons'

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      axios.get(baseUrl)
      .then(response => {
        if (response.status === 200) {
          setPersons(response.data)
        }
      })
    }

    return () => {
      subscribed = false
    }

  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} />
        <Filter setFilterNames={setFilterNames} filterNames={filterNames} />
      <h2>Add a new</h2>
        <PersonForm
          newName={newName}
          persons={persons}
          number={number}
          setNewName={setNewName}
          setPersons={setPersons}
          setNumber={setNumber}
          setMessage={setMessage}
        />
      <h2>Numbers</h2>
      <Persons filterNames={filterNames} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App