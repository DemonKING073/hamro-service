import axios from "axios"
import ApiError from "./types/ApiError"

// Check if the error is an axios error and return the data part of the response. Else return null
const axiosCheckError = (err: unknown) => {
    const isAxiosError = axios.isAxiosError(err)
    if (!isAxiosError) return null
    const axiosError = err as ApiError
    return axiosError?.response?.data
}

export default axiosCheckError