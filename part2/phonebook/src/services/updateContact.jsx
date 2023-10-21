import axios from "axios"

export const updateContact = async ({person}) => {
  return axios.put(`http://localhost:3001/persons/${person.id}`, person)
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