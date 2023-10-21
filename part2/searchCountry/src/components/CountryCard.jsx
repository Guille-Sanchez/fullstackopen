export const CountryCard = ({country, setSelectedCountry,  setFilteredCountries}) => {
  console.log('holaa')

  function copyCountry(){
    if(!country.showCountry){
      setSelectedCountry({...country})
    }  else {
      setSelectedCountry(null)
    }

    const toggleCountry = {...country, showCountry: !country.showCountry}
    setFilteredCountries(prev => {
      const countries = prev.filter(prevCountry => prevCountry.name.common !== country.name.common )
      return [...countries, toggleCountry]
    })
  }

  return (
    <li key={country.name.common + 'country'}>
      <div>
        <p>{country.name.common}</p>
        <button
          onClick={() => copyCountry()}
        >
          {!country.showCountry ? 'show' : 'hide'}
        </button>
      </div>
    </li>
  )
}
