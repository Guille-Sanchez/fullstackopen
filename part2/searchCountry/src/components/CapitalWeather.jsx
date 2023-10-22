import axios from "axios"
import { useEffect, useState } from "react"
const APIKEY_OPEN_WEATHER = import.meta.env.VITE_OPEN_WEATHER

export const CapitalWeather = ({country}) => {
  const [capital, setCapital] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let subscribed = true
    setLoading(true)
    setCapital({})

    if (subscribed){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${APIKEY_OPEN_WEATHER}`)
        .then(response => {
          setCapital(response.data)
        })
        .finally(() => setLoading(false))
    }

    return () => subscribed = false

  }, [country])

  return (
    <section>
      <header>
        <h2>Weather in {country.capital}</h2>
      </header>
      {loading ? <p>Loading...</p>
      : <>
          <p>Temperature: {capital.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${capital.weather[0].icon}@2x.png`}/>
          <p>Wind speed: {capital.wind.speed}</p>
        </>
      }
    </section>
  )
}
