import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
import { uploadToCloudinary } from "../../services/cloudinary";


export const getUserProfile = createAsyncThunk(
    "profile/getUserProfile",
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
                postCount: userPost.size,
                
            };
        } catch (error) {
            console.error("Error while Fetching User Profile", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/editProfile',
    async (data, { rejectWithValue }) => {
        try {
            console.log('update profile data', data);

            let updatedData = { ...data.userData };

            if (data?.previewImage && data?.type) {
                const url = await uploadToCloudinary(data.previewImage, data.type);
                updatedData = { ...data.userData, avtar: url };
            }

            await firestore()
                .collection('users')
                .doc(data.userId)
                .update(updatedData);

            return updatedData;
        } catch (error) {
            console.error("Error While Updating Profile Details", error);
            return rejectWithValue(error.message);
        }
    }
);


export const getSearchedProfile = createAsyncThunk('profile/getSearchedProfile', async (data, { rejectWithValue }) => {
    try {
        const userDetails = await firestore().collection('users').doc(data.id).get();

        const userFollow = await firestore()
            .collection('users')
            .doc(data.id)
            .collection('followers')
            .get();


        let isFollowed;
        userFollow.docs.forEach(doc => {
            if (doc === data.userId);
            {
                isFollowed = true;
                return;
            }
        });

        const userFollowing = await firestore()
            .collection('users')
            .doc(data.id)
            .collection('followings')
            .get();

        const usersPosts = await firestore()
            .collection('posts')
            .where('user_id', '==', data.id)
            .get();
        const user = userDetails.data();

        return {
            ...user,
            postCount: usersPosts.size,
            followersCount: userFollow.size,
            followingCount: userFollowing.size,
            isFollowed
        };

    } catch (error) {
        console.error("Error while Getting Searched Profile", error)
        return rejectWithValue(error.message)

    }
})

export const toggleFollow = createAsyncThunk('profile/follow', async (data, { rejectWithValue }) => {
    try {
        const doc = await firestore().collection('users').doc(data.id).collection('followers').doc(data.userId).get()

        if (doc.exists()) {

            await firestore()
                .collection('users')
                .doc(data.id)
                .collection('followers')
                .doc(data.userId)
                .delete()

            await firestore()
                .collection('users')
                .doc(data.userId)
                .collection('followings')
                .doc(data.id)
                .delete()

            return { isFollowed: false }
        } else {
            await firestore()
                .collection('users')
                .doc(data.id)
                .collection('followers')
                .doc(data.userId)
                .set({});

            await firestore()
                .collection('users')
                .doc(data.userId)
                .collection('followings')
                .doc(data.id)
                .set({});

            return { isFollowed: true }

        }

        // console.log('followed');
    } catch (error) {
        console.error("Error while Following ", error);
        return rejectWithValue(error)

    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        searchedProfile: {},
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
                state.profile = action.payload;
                state.success = true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = {
                    ...state.profile,
                    ...action.payload,
                };
                state.success = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(getSearchedProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getSearchedProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedProfile = action.payload;
                state.success = true;
            })
            .addCase(getSearchedProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleFollow.pending, (state) => {
                state.error = null;
                state.success = false;
            })
            .addCase(toggleFollow.fulfilled, (state, action) => {
                state.searchedProfile = {
                    ...state.searchedProfile,
                    ...action.payload,
                };
                state.success = true;
            })
            .addCase(toggleFollow.rejected, (state, action) => {
                state.error = action.payload;
            })


    }
});

export default profileSlice.reducer;