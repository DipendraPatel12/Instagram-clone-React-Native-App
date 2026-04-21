import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactSuggestionStyle';
import {
  getContacts,
  searchSuggestedContact,
} from '../../redux/slices/chatSlice';
const ContactSuggestion = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();
  const { profile } = useSelector(state => state.profile);
  const { suggestedContacts } = useSelector(state => state.chat);
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // console.warn('contact saved sucess', contacts);
  useEffect(() => {
    dispatch(getContacts(profile.id));
  }, []);
  // const getContact = async () => {
  //   try {
  //     const snapshot = await firestore()
  //       .collection('users')
  //       .where('id', '!=', profile.id)
  //       .get();
  //     const users = snapshot.docs.map(doc => {
  //       return {
  //         ...doc.data(),
  //       };
  //     });

  //     setContacts(users);
  //     console.log('data from contact suggestions ', snapshot, users);
  //   } catch (error) {
  //     console.error('Error while Getting Contacts', error);
  //   }
  // };

  const createChat = async item => {
    try {
      const oppositUserId = item.id;

      const existingChatSnapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', profile.id)
        .get();

      const existingChat = existingChatSnapshot.docs.find(doc =>
        doc.data().participants.includes(oppositUserId),
      );

      if (existingChat) {
        navigation.navigate('Chat', {
          id: item.id,
          name: item.name,
          username: item.username,
          chatId: existingChat.id,
          avatar: item.avtar,
          oppositeUserId: item.id,
        });
      } else {
        const chatRef = firestore().collection('chats').doc();

        await chatRef.set({
          participants: [profile.id, oppositUserId],
        });

        navigation.navigate('Chat', {
          chatId: chatRef.id,
          name: item.name,
          username: item.username,
          avatar: item.avtar,
          id: item.id,
          oppositeUserId: item.id,
        });
      }
    } catch (error) {
      console.error('Error while Creating Chat', error);
    }
  };

  return (
    <View style={styles.contain}>
      <View style={styles.searchBoxContainer}>
        <Text style={styles.toTextStyle}>To :</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#B0BEC5'}
          style={styles.inputTextStyle}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        ></TextInput>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.suggestedTextStyle}>Suggested</Text>

        <FlatList
          data={suggestedContacts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => createChat(item)}>
              {/* profile */}
              <View style={styles.itemContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{ uri: item.avtar || '' }}
                    style={styles.profileImageStyle}
                  ></Image>
                </View>

                {/* name and last message */}

                <View style={styles.itemDescContainer}>
                  <Text style={styles.nameTextStyle}>
                    {item?.name ?? 'user'}
                  </Text>
                  <Text style={styles.usernameTextStyle}>
                    {item?.username ?? ''}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>No contacts yet!</Text>
            </View>
          }
        ></FlatList>
      </View>
    </View>
  );
};

export default ContactSuggestion;
