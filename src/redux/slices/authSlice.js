import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "axios";

const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {

    } catch (error) {
        console.error("Error While Signing up user.", error)
        rejectWithValue(error)

    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loading: false,
        error: null,
        success: false
    }
})