import firestore from "@react-native-firebase/firestore";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

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

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
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
                state.loading = true
                state.error = false
            })
            .addCase(postLike.fulfilled, (state, action) => {
                state.loading = false
                const post = state.posts.find(post => post.id == action.payload.postId)
                post.isLiked = action.payload.isLiked
                post.likesCount = action.payload.isLiked ? post.likesCount + 1 : post.likesCount == 0 ? 0 : post.likesCount - 1;

            })
            .addCase(postLike.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }

})


export default postSlice.reducer