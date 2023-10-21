import { useEffect } from 'react'

export const RenderTooManyMatchesMessage = ({filteredCountries, setFilteredCountries, setSelectedCountry}) => {

  useEffect(() => {
    let subscribed = true

    if(subscribed && filteredCountries?.length > 10){
      setSelectedCountry(null)
      setFilteredCountries((prev) => prev.map(country => {return {...country, showCountry: false}} ))
    }

    return ()=> subscribed = false

    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  },[filteredCountries.length])

  return(
    <p>Too many matches, specify another filter.</p>
  )
}