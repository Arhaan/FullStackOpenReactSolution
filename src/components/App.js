import React, { useState, useEffect } from 'react'
import backendFunctions from '../services/contacts'
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
    {props.namesToShow
      .map(person =>
        <p key={person.name}>{person.name} {person.number} <button onClick={() => props.onDeleteClick(person)}>Delete</button></p>)}
    </div>
  )
}

const Notification = ({message, isError}) => {
  if(message === null){
    return null;
  }

  return(
    <div className={(isError) ?"error":"success"}>
      {message}
    </div>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setNewFilterName ] = useState('')
  const [ notification, setNotification] = useState({message:null, isError: false})

  const namesToShow=persons.filter((person)=>person.name.toLowerCase().includes(filterName.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find((element) => element.name === newName)){
      if(window.confirm(`${newName} is already in the Phonebook, replace old number with new one?`)){
        const updatedPerson ={
          ...persons.find(person => person.name === newName),
          number: newNumber
        }
        backendFunctions
        .updatePerson(updatedPerson)
        .then((response) =>{
          setPersons(persons.map(person => (person.name!==updatedPerson.name ? person : response)))
          setNewName('')
          setNewNumber('')}
        )
        .then(() => {
          setNotification({
            message: `Succesfully Updated ${updatedPerson.name}`,
            isError: false
          })
          setTimeout(
            () => setNotification({
              message: null,
              isError: false
            }), 5000)
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${updatedPerson.name} has already been deleted`,
            isError: true
          })
          console.log("Setting timeout")
          setTimeout(
            () => setNotification({
              message: null,
              isError: false
            }), 5000)
        })
        return;
      }
    }
    const newperson = {
      name: newName,
      number: newNumber
    }
    backendFunctions
      .createPerson(newperson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        setNotification({
          message: `Succesfully Created ${newperson.name}`,
          isError: false
        })
        setTimeout(
          () => setNotification({
            message: null,
            isError: false
          }), 5000)
      })


  }

  const deletePerson = (delperson) => {
    if (window.confirm(`Are you sure you want to delete ${delperson.name}`)){
      backendFunctions
        .deletePerson(delperson.id)
        .then((response) => {
          setPersons(persons.filter(person => person !== delperson))
        })
        .then(() => {
          setNotification({
            message: `Succesfully Deleted ${delperson.name}`,
            isError: false
          })
          setTimeout(
            () => {setNotification({message: null, isError: false})}, 5000)
        })

    }
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
    backendFunctions
      .getAll()
      .then(response=>{
        setPersons(response)
      })
      console.log("Received the Persons")
  }, [])
  console.log("Rendered Again")
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError}/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} onDeleteClick={deletePerson}/>
    </div>
  )
}

export default App
