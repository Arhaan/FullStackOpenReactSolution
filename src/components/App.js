import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../index.css'

const CountriesForm = (props) => {
  return(
    <div>
      <form>
        Find countries: <input value={props.countryQuery} onChange={props.handleQueryChange}/>
      </form>
    </div>
  )
}

const CountryProfile = (props) =>{
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [weatherDataToDisplay, setWeatherDataToDisplay ] = useState({
    temp: "...",
    wind_speed: "...",
    wind_dir: "...",
    image_link: ""
  })
  useEffect(()=>{
  axios
    .get("http://api.weatherstack.com/current?access_key=" + weather_api_key+"&query="+props.country.capital)
    .then(response =>{
    const temp = response.data.current.temperature
    const wind_speed = response.data.current.wind_speed
    const wind_dir = response.data.current.wind_dir
    const image_link = response.data.current.weather_icons[0]
    setWeatherDataToDisplay({
      temp: temp,
      wind_speed: wind_speed,
      wind_dir: wind_dir,
      image_link: image_link
    })
    })
  },[props.country.capital, weather_api_key])
  return(
    <div>
      <h1>{props.country.name}</h1>
      <p>Capital: {props.country.capital}</p>
      <p>Population: {props.country.population}</p>
      <h2>Languages</h2>
      <ul>
        {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <h2>Weather in {props.country.name}</h2>
      <p><b>Temperature</b>: {weatherDataToDisplay.temp} Celsius</p>
      <img src={weatherDataToDisplay.image_link} alt=""></img>
      <p><b>Wind</b>: {weatherDataToDisplay.wind_speed} kmph direction {weatherDataToDisplay.wind_dir}</p>
    </div>
  )
}
const DisplayCountries = (props) => {

  if(props.countryQuery === ""){
    return(
      <div></div>
    )
  }
  else if(props.countriesToShow.length > 10){
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if(props.countriesToShow.length === 1){
    return(
      <CountryProfile country = {props.countriesToShow[0]}/>
    )
  }
  else if(props.countriesToShow.length > 0){
    return(
      <div>
        {props.countriesToShow.map(country=>
          {
            const toShow = country.name===props.selectedCountryToShow
            return(<div key={country.name}>
              <p >{country.name} <button type="button" onClick={props.handleShowButtonClick(country.name)}>{(toShow)?"Hide":"Show"}</button> </p>
              {(toShow)? <CountryProfile country = {country}/>: <></>}
              </div>
              )}
        )}
      </div>
    )
  }
  else{
    return(
      <div>Result Not Found</div>
    )
  }
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [countryQuery, setCountryQuery] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])
  const [selectedCountryToShow, setSelectedCountryToShow] = useState("")

  useEffect(()=>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response)=>{
        setCountries(response.data)
      })
  })

  const handleQueryChange = (event) => {
    const newQuery = event.target.value
    const newCountries = countries.filter(country => country.name.includes(newQuery))
    setCountryQuery(newQuery)
    setCountriesToShow(newCountries)
    setSelectedCountryToShow("")
    console.log(newCountries.length)
  }
  const handleShowButtonClick = (name) => () => {
    if(selectedCountryToShow === name) {
      setSelectedCountryToShow("")
    }
    else{
      setSelectedCountryToShow(name)
    }
  }
  return(
    <div>
      <CountriesForm countryQuery={countryQuery} handleQueryChange={handleQueryChange}/>
      <DisplayCountries countryQuery={countryQuery} countriesToShow={countriesToShow} handleShowButtonClick={handleShowButtonClick} selectedCountryToShow={selectedCountryToShow}/>
    </div>
  )
}

export default App
