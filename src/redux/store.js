import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'
import profileReducer from '../redux/slices/profileSlice'
import postSlice from '../redux/slices/postSlice'
import chatSlice from '../redux/slices/chatSlice'
import storySlice from '../redux/slices/storySlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        posts: postSlice,
        chat: chatSlice,
        story: storySlice
    },
})

export default store;