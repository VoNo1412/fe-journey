import axios from "axios";
import { HOST_BACKEND } from "./constants";

export default axios.create({
    baseURL: `${HOST_BACKEND}`,
    withCredentials: true
})