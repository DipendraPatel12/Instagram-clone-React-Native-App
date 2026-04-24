import firestore from "@react-native-firebase/firestore";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { act } from "react";
import { uploadToCloudinary } from "../../services/cloudinary";

export const getPosts = createAsyncThunk('posts/getPosts', async (userId, { rejectWithValue }) => {
    try {

        const snapshot = await firestore().collection('posts').get();
        const postsData = snapshot.docs.map(doc => {
            const data = doc.data()
            return {
                id: doc.id,
                ...data,
                isLiked: data?.likes?.includes(userId),
                likesCount: data?.likes?.length
            }
        });

        return postsData;
    } catch (error) {
        console.error("Error while getting Posts from DB ", error)
        return rejectWithValue(error.message)

    }
})

export const postLike = createAsyncThunk(
    'posts/postLike',
    async ({ id, userId }, { rejectWithValue }) => {
        try {
            const postRef = firestore().collection('posts').doc(id);
            const docSnap = await postRef.get();
            const postData = docSnap.data();

            const alreadyLiked = postData?.likes?.includes(userId);

            await postRef.update({
                likes: alreadyLiked
                    ? firestore.FieldValue.arrayRemove(userId)
                    : firestore.FieldValue.arrayUnion(userId),
            });

            return { postId: id, isLiked: !alreadyLiked };

        } catch (error) {
            console.error("Error while liking post ", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (postId, { rejectWithValue }) => {
    try {
        await firestore().collection("posts").doc(postId).delete();
        return postId;
    } catch (error) {
        console.error("Error while deleting post", error);
        return rejectWithValue(error.message)
    }
})

export const uploadPost = createAsyncThunk("posts/uploadPost", async (data, { rejectWithValue }) => {
    try {
        const url = await uploadToCloudinary(data.img, data.type);
        if (!url) return false
        await firestore()
            .collection('posts')
            .add({
                user_id: data?.profile?.id,
                username: data?.profile?.username || 'Unknown',
                userAvatar: data?.profile?.avtar,
                post_media_url: url,
                content: data.content,
            });
        return true
    } catch (error) {
        console.error("Error While Uploading Post", error);
        return rejectWithValue(error.message)
    }
})

export const getMyPosts = createAsyncThunk("posts/getMyPosts", async (userId, { rejectWithValue }) => {
    try {
        const snapshot = await firestore().collection("posts").where("user_id", '==', userId).get()
        const postsData = snapshot.docs.map(doc => {
            const data = doc.data()
            return {
                id: doc.id,
                ...data,
            }
        });
        console.warn("MY post ", postsData)
        return postsData
    } catch (error) {
        console.error("Error While Fetching MyPosts", error)
        return rejectWithValue(error)

    }
})
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        myPosts: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(postLike.pending, (state, action) => {
                state.error = false
            })
            .addCase(postLike.fulfilled, (state, action) => {
                const post = state.posts.find(post => post.id == action.payload.postId)
                post.isLiked = action.payload.isLiked
                post.likesCount = action.payload.isLiked ? Number(post.likesCount) + 1 : Number(post.likesCount) == 0 ? 0 : Number(post.likesCount) - 1;

            })
            .addCase(postLike.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deletePost.pending, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload)
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload

            })
            .addCase(uploadPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(uploadPost.fulfilled, (state, action) => {
                state.success = action.payload;
                state.loading = false
            })
            .addCase(uploadPost.rejected, (state, action) => {
                state.error = action.payload
                state.success = false

            })

            .addCase(getMyPosts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload;
                state.loading = false
            })
            .addCase(getMyPosts.rejected, (state, action) => {
                state.error = action.payload
                state.success = false

            })

    }

})


export default postSlice.reducer