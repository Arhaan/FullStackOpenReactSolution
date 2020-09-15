import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../index.css'

const Filter = (props)=> {
  return(
    <div>
      <form>
        <div>
          Filter Shown with <input value={props.filterName} onChange={props.handleFilterChange}/>
        </div>
      </form>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
          Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
  )
}

const Persons = (props) => {
  return (
    <div>
    {props.namesToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setNewFilterName ] = useState('')

  const namesToShow=persons.filter((person)=>person.name.toLowerCase().includes(filterName.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find((element) => element.name === newName)){
      alert(`${newName} is already in the Phonebook`)
      return;
    }
    const newperson = {
      name: newName,
      number: newNumber
    }
    axios
      .post("http://localhost:3001/persons", newperson)
      .then(response => {
        setPersons(persons.concat(newperson))
        setNewName('')
        setNewNumber('')
      })


  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilterName(event.target.value)
  }

  useEffect(()=>{
    console.log("Effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response=>{
        setPersons(response.data)
      })
      console.log("Received the notes")
  }, [])
  console.log("Rendered Again")
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow}/>
    </div>
  )
}

export default App
