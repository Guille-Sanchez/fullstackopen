import { deleteContact } from "../services/deleteContact"

export const Persons = ({persons, filterNames, setPersons, setMessage}) => {

  const handleFilter = () =>
    filterNames !== ''
      ? persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))
      : persons

  const handleOnClick = async ({person, id}) => {
    const value = confirm('Are you sure you want to delete this contact?' )

    if (!value) return

    const {error} = await deleteContact({id})
    if (!error) {
      setPersons(persons.filter(person => person.id !== id))
    } else {
      setMessage(() => {return {status: 'error', message: `Information of ${person.name} has already been removed from the server`}})
    }
  }
  

  return (
    <ul style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      {
        handleFilter()?.map(person =>
          <li
            key={person.id}
            style={{display: 'flex', gap: '20px'}}
          >
            <p style={{margin: '0px'}}>{person.name} {person.number}</p>
            <button
              onClick={() => handleOnClick({person, id:  person.id})}
            >
              delete
            </button>
          </li>
        )
        ?? <p>No persons found</p>
      }
    </ul>
  )
}
