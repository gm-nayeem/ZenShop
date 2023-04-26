import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        isError: false
    },
    reducers: {
        // get all products
        getProductStart: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        getProductSuccessful: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        },

        // delete product
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        deleteProductSuccessful: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload),
                1
            )
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        },

        // update product
        updateProductStart: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        updateProductSuccessful: (state, action) => {
            state.isFetching = false;           
            const index = state.products.findIndex(item => item._id === action.payload.id);
            state.products[index] = action.payload.product;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        },

        // add product
        addProductStart: (state) => {
            state.isFetching = true;
            state.isError = false;
        },
        addProductSuccessful: (state, action) => {
            state.isFetching = false;        
            state.products.push(action.payload.savedProduct);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        }
    }
})

export const {
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
    addProductSuccessful,
    testProduct
} = productSlice.actions;
export default productSlice.reducer;
