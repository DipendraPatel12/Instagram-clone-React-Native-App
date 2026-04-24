import firestore from "@react-native-firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";


export const getRecentChats = createAsyncThunk('chat/getRecentChats', async (userId, { rejectWithValue }) => {
    console.log("called chats")
    try {

        const snapshot = await firestore()
            .collection('chats')
            .where('participants', 'array-contains', userId)
            .get();

        const chatsData = await Promise.all(
            snapshot.docs.map(async doc => {
                const chat = { id: doc.id, ...doc.data() };

                const otherUserId = chat.participants.find(id => id !== userId);

                const userDoc = await firestore()
                    .collection('users')
                    .doc(otherUserId)
                    .get();

                const otherUser = userDoc.data();

                return {
                    ...chat,
                    otherUserId,
                    otherUser,
                };
            }),
        );
        return chatsData
    } catch (error) {

        console.error("Error While getting recent Chats with users", error);
        rejectWithValue(error)

    }
})

export const getContacts = createAsyncThunk('chat/getContacts', async (userId, { rejectWithValue }) => {
    try {

        const snapshot = await firestore()
            .collection('users')
            .where('id', '!=', userId)
            .get();
        const users = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
            };
        });

        return users;
    } catch (error) {
        console.error("Error while Getting Contacts", error);
        rejectWithValue(error)

    }
})


export const deleteMessage = createAsyncThunk('chat/deleteMesssage', async ({ chatId, messageId }, { rejectWithValue }) => {
    try {
        await firestore().collection("chats").doc(chatId).collection('messages').doc(messageId).delete()
        return true
    } catch (error) {
        console.error("Error While deleting message", error)
        return rejectWithValue(error)
    }
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async (data, { rejectWithValue }) => {
    try {
        await firestore()
            .collection('chats')
            .doc(data.activeChatId)
            .collection('messages')
            .add({
                senderId: data.profile.id,
                senderName: data.profile.name,
                content: data.messageText,
                sendingTime: firestore.FieldValue.serverTimestamp(),
                replyTo: data.repliedBoxVisible
                    ? {
                        ...data.repliedToMessage,
                    }
                    : null,
            });
        return true

    } catch (error) {
        console.error("Error While sending message", error)
        return rejectWithValue(error)
    }
})


const createChatBetweenUsers = createAsyncThunk('chat/createChatBetweenUsers', async ({ rejectWithValue }) => {
    try {

    } catch (error) {
        console.error("Error While Creating Chat between users ", error)
        return rejectWithValue(error)
    }
})
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        recentChats: [],
        suggestedContacts: [],
        messages: [],
        loading: false,
        error: null
    },
    reducers: {

        searchRecentChatWith: (state, action) => {

            state.recentChats = state.recentChats.filter(contact => contact?.otherUser?.username.toLowerCase().startsWith(action.payload.toLowerCase()))
        }

        , searchSuggestedContact: (state, action) => {

            state.suggestedContacts = state.suggestedContacts.filter(contact => contact?.otherUser?.username.toLowerCase().startsWith(action.payload.toLowerCase()))
        }



    },

    extraReducers: (builder) => {
        builder
            .addCase(getRecentChats.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getRecentChats.fulfilled, (state, action) => {
                state.recentChats = action.payload || [];
                state.loading = false
                state.error = null
            })
            .addCase(getRecentChats.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(getContacts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.suggestedContacts = action.payload;
                state.loading = false
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteMessage.pending, (state, action) => {
                state.success = action.payload
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.success = action.payload
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.success = false
                state.error = action.payload
            })
            .addCase(sendMessage.pending, (state, action) => {
                state.success = action.payload
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.success = action.payload
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.success = false
                state.error = action.payload
            })
    }
})
export const { searchRecentChatWith, searchSuggestedContact } = chatSlice.actions
export default chatSlice.reducer