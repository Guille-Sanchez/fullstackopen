import { useState } from "react";
import { RenderSingleCountry } from "./RenderSingleCountry";
import { RenderCountryList } from "./RenderCountryList";
import { RenderTooManyMatchesMessage } from "./RenderTooManyMatchesMessage";

export const CountryList = ({ filteredCountries, setFilteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  return (
    <section>
      {filteredCountries.length > 10 && <RenderTooManyMatchesMessage setFilteredCountries={setFilteredCountries} setSelectedCountry={setSelectedCountry} filteredCountries={filteredCountries}/>}
      {(filteredCountries.length > 1 && filteredCountries.length <= 10) && <RenderCountryList filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />}
      {(filteredCountries.length === 1 || (selectedCountry !== null && filteredCountries.length <= 10)) && <RenderSingleCountry selectedCountry={selectedCountry} filteredCountries={filteredCountries}/>}
    </section>
  )
}
