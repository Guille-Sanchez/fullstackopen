import { CapitalWeather } from "./CapitalWeather"

export const RenderSingleCountry = ({selectedCountry, filteredCountries}) => {
  let country = null

  if(filteredCountries?.length === 1){
    country =filteredCountries[0]
  } else if(selectedCountry !== null && filteredCountries?.length <= 10 && filteredCountries?.length > 1){
    country = selectedCountry
  }

  if(country === null){
    return <p>No hay countries kpe</p>
  } else {
      return (
        <div>
          <h1>{country?.name?.common}</h1>
          <div>
            <p>{country?.capital}</p>
            <p>{country?.area}</p>
          </div>
          <div>
            <h2>languages:</h2>
            <ul>
              {Object.values(country?.languages)?.map((language) => <li key={language + 'language'}>{language}</li>)}
            </ul>
          </div>
          <img src={country.flags.png} alt={country.name + 'flag'} width={200} height={125}/>
          <CapitalWeather country={country} />
        </div>
      )
  }
}
