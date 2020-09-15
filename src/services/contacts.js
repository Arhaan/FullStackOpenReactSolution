import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (newperson) => {

    return axios.post(baseUrl, newperson)
}

const deletePerson = (id) => {
    console.log(`Deleting id = ${id}`)
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, createPerson, deletePerson}

