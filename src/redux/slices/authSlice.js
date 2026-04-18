import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';

export const getUserProfile = createAsyncThunk(
    "auth/getUserProfile",
    async (id, { rejectWithValue }) => {
        try {
            // console.log("Api Called For Get User Profile", id);

            const response = await firestore()
                .collection('users')
                .doc(id)
                .get();

            if (!response.exists) {
                return rejectWithValue("User not found");
            }

            const userPost = await firestore().collection('posts').where('user_id', '==', id).get();

            // console.log("userPost", userPost)

            const userFollow = await firestore()
                .collection('users')
                .doc(id)
                .collection('followers')
                .get();


            // console.log(userFollow)
            const userFollowing = await firestore()
                .collection('users')
                .doc(id)
                .collection('followings')
                .get();

            // console.log(userFollowing)
            const data = response.data();

            // console.log("get User profile res", data, userFollow.size, userFollowing.size, userPost.size);

            return {
                ...data,
                followersCount: userFollow.size,
                followingCount: userFollowing.size,
                postCount: userPost.size
            };
        } catch (error) {
            console.error("Error while Fetching User Profile", error);
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loading: false,
        error: null,
        success: false
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;