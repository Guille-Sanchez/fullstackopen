import axios from "axios"

export const updateContact = async ({person}) => {
  const baseUrl = 'https://phonebook-bmxi.onrender.com/api/persons'
  return axios.put(`${baseUrl}/${person.id}`, person)
    .then(response => {
      if(response.status === 200){
        return {error: false}
      }
      return {error: true}
    })
    .catch(error => {
      console.log(error)
      return {error: true}
    })
}