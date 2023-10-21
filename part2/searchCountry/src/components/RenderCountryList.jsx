import { CountryCard } from "./CountryCard";

export const RenderCountryList = ({filteredCountries, setFilteredCountries, setSelectedCountry, selectedCountry}) => {
  return(
  <ul>
    {filteredCountries.map(country => (
      <CountryCard
        key={country.name.common}
        country={country}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    ))}
  </ul>
)}