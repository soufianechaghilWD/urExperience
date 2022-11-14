import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_ApiUrl
})

export default instance;