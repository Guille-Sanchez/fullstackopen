import axios from "axios"

export const addNewContact = async ( {newName, number, personsLength  }) => {
  const baseUrl = 'https://phonebook-bmxi.onrender.com/api/persons'
  const error = {error: false, errorMessage: ''}
  return axios.post(baseUrl, { name: newName, number: number, id: personsLength + 1  })
  .then(response => {
    if (response.status === 201 || response.status === 200) {
      return {error}
    }
    else {
      alert('something went wrong')
      return {error: true}

    }})
    .catch(error => {
      error = {error: true, errorMessage: error.message}
      return {error}
    })
}