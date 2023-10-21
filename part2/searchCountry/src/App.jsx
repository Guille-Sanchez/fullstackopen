import { useEffect, useState } from "react"
import { getCountries } from "./services/getCountries"
import { CountryList } from "./components/CountryList"

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    let subscribed = true
    
    if(subscribed){
      setLoading(true)
      getCountries({setLoading})
        .then(({countriesResponse}) => {
          if (!countriesResponse.error) {
            setCountries(countriesResponse.countries)
          }
        })
    }

    return () => {
      subscribed = false
    }
  }, [])

  useEffect(() => {
    let subscribed = true

    if (subscribed && !loading) {
      let filter = null
      if(search !== ''){
        filter = countries?.filter(country => country.name.common?.toLowerCase().includes(search.toLowerCase()))
      } else {
        filter = [...countries]
      }
      const showedCountries = filter.map(country => {return {showCountry: false, ...country}})
      setFilteredCountries(showedCountries)
    }
  
    return () => {
      subscribed = false
    }
  }, [countries, search, loading])

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <main>
      <form>
        <label>find countries</label>
        <input type="text" placeholder="Argentina, Brasil, Colombia, etc..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
      <CountryList filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </main>
  )
}

export default App
