import {
    loginStart,
    loginSuccessful,
    loginFailure
} from './userReducer';
import { publicRequest } from "../utils/makeRequest";

// register
export const register = async (user) => {
    try {
        const res = await publicRequest.post("/auth/register", user);
        return res.data;
    } catch (err) {
        console.log(err.data);
    }
}

// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        res.data & dispatch(loginSuccessful(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

// logout
export const logout = async () => {
    try {
        const res = await publicRequest.post("/auth/logout");
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

// add order
// export const addOrder = async (order, dispatch) => {
//     dispatch(addOrderStart());
//     try {
//       const res = await userRequest.post(`/orders`, order);
//       dispatch(addOrderSuccess(res.data));
//     } catch (err) {
//       dispatch(addOrderFailure());
//     }
// };