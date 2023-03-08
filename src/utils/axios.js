import axios from 'axios';


const instance = axios.create({
   baseURL: 'http://localhost:4440'
})

export default instance;