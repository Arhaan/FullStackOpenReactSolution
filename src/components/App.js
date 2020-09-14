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

const CountryProfile = ({country}) =>{
  return(
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
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
      <ul>
        {props.countriesToShow.map(country=><li key={country.name}>{country.name}</li>)}
      </ul>
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
    console.log(newCountries.length)
  }
  return(
    <div>
      <CountriesForm countryQuery={countryQuery} handleQueryChange={handleQueryChange}/>
      <DisplayCountries countryQuery={countryQuery} countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App
