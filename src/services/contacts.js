import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (newperson) => {
    return axios.post(baseUrl, newperson).then(response => response.data)
}

const updatePerson = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

const deletePerson = (id) => {

    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, createPerson, deletePerson, updatePerson}

