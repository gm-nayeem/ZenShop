import axios from "axios";
const REACT_APP_API_URL = "https://zenshop.vercel.app/api";

// console.log(
//     "token: ", 
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.admin)?.currentUser?.token
// );
        
export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});

export const userRequest = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: JSON.parse(localStorage.getItem("persist:root"))?.admin && {token: `Bearer ${
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.admin)?.currentUser?.token
    }`}
});

