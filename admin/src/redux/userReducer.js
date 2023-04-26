import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "admin",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccessful: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isError = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        logout: (state) => {
            state.currentUser = null
        }
    }
})

export const {
    loginStart, 
    loginSuccessful, 
    loginFailure,
    logout
} = userSlice.actions;
export default userSlice.reducer;
