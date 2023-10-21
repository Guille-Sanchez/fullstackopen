import axios from "axios"

export const getCountries = async ({setLoading}) => {
  const urlCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  return await axios.get(urlCountries)
    .then(response => {
    if(response.status === 200) {
        return {countriesResponse: {countries: response.data, error: false}}
    }
    })
    .catch(() => {return {countriesResponse: {countries: [], error: true}}})
    .finally(() => setLoading(false))
}
