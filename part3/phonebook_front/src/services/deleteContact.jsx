import axios from "axios"

export async function deleteContact ({id}) {
  const baseUrl = 'https://phonebook-bmxi.onrender.com/api/persons'
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      if (response.status === 204 || response.status === 200){
        return {error: false}
      } else {
        return {error: true}
      }
    })
      .catch(() => {
        return {error: true}
      })
}