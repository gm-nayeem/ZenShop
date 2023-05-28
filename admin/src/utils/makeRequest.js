import axios from "axios";
import {REACT_APP_API_URL} from "../private/URL";

        
export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});

export const userRequest = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: JSON.parse(localStorage.getItem("persist:root"))?.admin && {token: `Bearer ${
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.admin).currentUser?.token
    }`}
});

