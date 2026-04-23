import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadToCloudinary } from "../../services/cloudinary";
import firestore from "@react-native-firebase/firestore";

const { createSlice } = require("@reduxjs/toolkit");

export const getStories = createAsyncThunk("story/getStories", async (user, { rejectWithValue }) => {
    try {

        const now = new Date();

        const snapshot = await firestore()
            .collection('stories')
            .where('expiresAt', '>', now)
            .get();

        const storiesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.createdAt?.toDate().toISOString(),
            expiresAt: doc.expiresAt?.toDate().toISOString()
        }));
        console.log("userid dd d ", user.uid)

        const myStory = storiesData.find(st => st.user_id == user.uid)
        const otherStories = storiesData.filter(st => st.user_id != user.uid);
        console.log("MY STory and otherStories ", myStory, otherStories)
        const updatedStories = myStory != undefined ? [
            {
                isMyStory: true,
                ...myStory,
            },
            ...otherStories,
        ] : [
            { isMyStory: false },
            ...otherStories,
        ];

        console.warn("Storied from redux store", updatedStories)
        return updatedStories
    } catch (error) {
        console.error("Error While Fetching stroires from storage", error);
        return rejectWithValue(error.message)
    }
})


export const postStory = createAsyncThunk("story/postStory", async (data, { rejectWithValue }) => {
    try {
        // console.log('called');
        const now = new Date();
        const storyUrl = await uploadToCloudinary(data.url, data.type);
        await firestore()
            .collection('stories')
            .add({
                user_id: data?.profile?.id,
                username: data?.profile?.username,
                avatar: data?.profile.avtar || null,
                story_url: storyUrl,
                createdAt: firestore.FieldValue.serverTimestamp(),
                expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            });

        return true

    } catch (error) {
        console.error("Error While Posting Story", error)
        return rejectWithValue(error);

    }
})


const storySlice = createSlice({
    name: 'story',
    initialState: {
        stories: [],
        loading: false,
        error: null,
        success: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(postStory.pending, (state, action) => {
                state.loading = true;
                state.success = false
            })
            .addCase(postStory.fulfilled, (state, action) => {
                state.success = action.payload
                state.loading = false
            })
            .addCase(postStory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
                state.success = false
            })
            .addCase(getStories.pending, (state, action) => {
                state.loading = true;

            })
            .addCase(getStories.fulfilled, (state, action) => {
                state.stories = action.payload
                state.loading = false
            })
            .addCase(getStories.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false

            })
    }
})

export default storySlice.reducer