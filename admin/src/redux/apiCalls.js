import { publicRequest } from "../utils/makeRequest";

import {
    loginStart,
    loginFailure
} from './userReducer';


// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);  
        return res.data;
    } catch(err) {
        dispatch(loginFailure());
        return err.response.data;
    }
}

// logout
// export const logout = async (dispatch) => {
//     dispatch(logout());
// }
