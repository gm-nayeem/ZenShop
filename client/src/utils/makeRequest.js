import axios from "axios";
import {REACT_APP_API_URL} from "../private/URL";

export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});

export const userRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});