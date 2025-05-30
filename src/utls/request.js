import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default instance
