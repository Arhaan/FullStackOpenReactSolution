import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (newperson) => {
    return axios.post(baseUrl, newperson)
}

export default {getAll, createPerson}

