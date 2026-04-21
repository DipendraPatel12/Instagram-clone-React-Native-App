import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5/static';
import firestore, { disableNetwork } from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import styles from './MessageStyle';
import { FlashList } from '@shopify/flash-list';
import {
  getRecentChats,
  searchRecentChatWith,
} from '../../redux/slices/chatSlice';

const Message = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [chats, setChats] = useState([]);
  const { profile } = useSelector(state => state.profile);
  const { recentChats } = useSelector(state => state.chat);
  console.log('REddddddddddddddddddddddddd=0', recentChats);
  const handleSearch = () => {
    if (searchText === '') {
      return;
    }
    const data = chats.filter(chat =>
      recentChats?.otherUser?.name
        .toLowerCase()
        .startsWith(searchText.toLowerCase()),
    );
    setChats(data);
  };

  useEffect(() => {
    // handleSearch();
    dispatch(searchRecentChatWith(searchText));
  }, [searchText]);

  useEffect(() => {
    dispatch(getRecentChats(profile.id));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      console.log('Screen is focused');
    }, []),
  );
  // const getRecentChats = async () => {
  //   try {
  //     const snapshot = await firestore()
  //       .collection('chats')
  //       .where('participants', 'array-contains', profile.id)
  //       .get();

  //     const chatsData = await Promise.all(
  //       snapshot.docs.map(async doc => {
  //         const chat = { id: doc.id, ...doc.data() };

  //         const otherUserId = chat.participants.find(id => id !== profile.id);

  //         const userDoc = await firestore()
  //           .collection('users')
  //           .doc(otherUserId)
  //           .get();

  //         const otherUser = userDoc.data();

  //         return {
  //           ...chat,
  //           otherUserId,
  //           otherUser,
  //         };
  //       }),
  //     );

  //     setChats(chatsData);
  //     console.log(chatsData);
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   }
  // };

  // const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <View style={styles.container}>
      <FlashList
        data={recentChats}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.itemContainer}
            activeOpacity={0.6}
            underlayColor="#263238"
            // onPress={() => alert('Pressed!')}

            onPress={() =>
              navigation.navigate('Chat', {
                id: item?.otherUser?.id,
                name: item?.otherUser?.name,
                username: item?.otherUser?.username,
                avatar: item?.otherUser?.avtar,
                oppositeUserId: item?.otherUser.id,
              })
            }
          >
            {/* profile */}
            <View style={styles.profileAndUsernameContainer}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: item?.otherUser?.avtar }}
                  style={styles.imageStyle}
                ></Image>
              </View>

              {/* name and last message */}

              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.usernameTextStyle}>
                  {item?.otherUser?.name}
                </Text>
                <Text style={styles.usernameTextStyle}>4+ new messages</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarBox}>
              <FontAwesome5
                name="search"
                color="white"
                iconStyle="solid"
              ></FontAwesome5>
              <TextInput
                placeholder="Search"
                style={styles.searchBarInpuyStyle}
                value={searchText}
                onChangeText={text => setSearchText(text)}
              ></TextInput>
            </View>

            <Text style={styles.messagesTextStyle}>Messages</Text>
          </View>
        }
      ></FlashList>
    </View>
  );
};

export default Message;
