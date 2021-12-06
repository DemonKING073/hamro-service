import { AxiosError } from "axios";

type ApiError = AxiosError<{
    message?: string | string[]
}>

export default ApiError
