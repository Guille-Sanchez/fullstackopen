import axios from "axios"

export async function deleteContact ({id}) {
  return axios.delete(`http://localhost:3001/persons/${id}`)
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