import axios from 'axios'
import LocalStorageService from './services/LocalStorageServices'

const baseURL = 'http://localhost:8080'

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = LocalStorageService.getAccessToken()
    if (accessToken && config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error)
    return error
})

export default axiosInstance