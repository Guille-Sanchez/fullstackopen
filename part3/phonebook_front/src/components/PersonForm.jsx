import { addNewContact } from "../services/addNewContact"
import { updateContact } from "../services/updateContact"



export const PersonForm =  ({setPersons, setNewName, setNumber, newName, number, persons, setMessage}) => {
  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const personOnList = persons.find(person => person.name === newName)
    if (personOnList) {
      const updateConfirmation = confirm(`${personOnList.name} is already added to phonebook, replace the old number with a new one?`)
      
      if (updateConfirmation) {
        const {error} = await updateContact({person: {...personOnList, number}})

        if (!error){
          setPersons(persons.map(person => person.name === newName ? {...person, number: number} : person))
          setNewName(''); setNumber('')
        }
      }
      return
    }

    const {error} = await addNewContact({newName, number, personsLength: crypto.randomUUID()})

    if (!error){
      setMessage({state: 'success', message: `Added ${newName}`})
      setPersons(persons.concat({ name: newName, number: number, id: crypto.randomUUID()}))
      setNewName(''); setNumber('')
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
    <div>name: <input value={newName} onChange={e => setNewName(e.target.value)}  /></div>
    <div>number: <input value={number} onChange={e => setNumber(e.target.value)}/></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}
