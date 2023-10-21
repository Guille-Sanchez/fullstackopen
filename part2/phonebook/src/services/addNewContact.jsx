import axios from "axios"

export const addNewContact = async ( {newName, number, personsLength  }) => {
  return axios.post('http://localhost:3001/persons/', { name: newName, number: number, id: personsLength + 1  })
  .then(response => {
    if (response.status === 201 || response.status === 200) {
      return {error: false}
    }
    else {
      alert('something went wrong')
      return {error: true}

    }})
    .catch(error => {
      console.log(error)
      return {error: true}
    })
}