import axios from 'axios';

//axios instance to base url
const instance = axios.create({
    baseURL: "http://localhost:5000/api"
});

export default instance;