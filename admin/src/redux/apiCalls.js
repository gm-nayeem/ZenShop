// user
import {
    loginStart, 
    loginSuccessful, 
    loginFailure
} from './userReducer';
import {publicRequest, userRequest} from "../utils/makeRequest";

// product 
import {
    getProductStart,
    getProductSuccessful,
    getProductFailure,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccessful,
    updateProductFailure,
    updateProductStart,
    updateProductSuccessful,
    addProductFailure,
    addProductStart,
    addProductSuccessful

} from './productReducer';


// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);  
        dispatch(loginSuccessful(res.data));
    } catch(err) {
        dispatch(loginFailure());
    }
}

// get product
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products/all"); 
        dispatch(getProductSuccessful(res.data));
    } catch(err) {
        dispatch(getProductFailure());
    }
}

// delete product
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try{
        await userRequest.delete(`/products/${id}`);     
        dispatch(deleteProductSuccessful(id));
    } catch(err) {
        dispatch(deleteProductFailure());
    }
}

// update product
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());
    try{   
        const res = await userRequest.put("/products", product);
        dispatch(updateProductSuccessful({id, product}));
    } catch(err) {
        dispatch(updateProductFailure());
    }
}

// add product
export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());
    try{   
        const res = await userRequest.post("/products", product)
        dispatch(addProductSuccessful(res.data));
    } catch(err) {
        dispatch(addProductFailure());
    }
}