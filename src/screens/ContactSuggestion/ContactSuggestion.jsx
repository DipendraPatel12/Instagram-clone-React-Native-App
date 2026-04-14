import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5/static';
import { rf, rh, rw } from '../../helper/responsive';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
const ContactSuggestion = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);
  const [contacts, setContacts] = useState([]);
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // console.warn('contact saved sucess', contacts);
  useEffect(() => {
    getContact();
  }, []);
  const getContact = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .where('id', '!=', user.id)
        .get();
      const users = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
        };
      });

      setContacts(users);
      console.log('data from contact suggestions ', snapshot, users);
    } catch (error) {
      console.error('Error while Getting Contacts', error);
    }
  };

  const createChat = async item => {
    console.log('item', item);
    const oppositUserId = item.id;
    const chatId = `${oppositUserId}-${user.id}`;
    const reverseChatId = `${user.id}-${oppositUserId}`;

    try {
      const chatsRef = firestore().collection('chats');
      const chatIdCheck = await chatsRef.doc(chatId).get();
      const reverseChatIdCheck = await chatsRef.doc(reverseChatId).get();
      console.log(chatIdCheck, reverseChatIdCheck);
      if (chatIdCheck.exists() || reverseChatIdCheck.exists()) {
        console.log('alreadty');
        navigation.navigate('Chat', {
          name: item.name,
          username: item.username,
          chatId,
          reverseChatId,
          avatar: item.avtar,
        });
        return;
      } else {
        const data = await firestore().collection('chats').doc(chatId).set({});
        navigation.navigate('Chat', {
          chatId,
          reverseChatId,
          name: item.name,
          username: item.username,
          avatar: item.avtar,
        });
        return;
      }
    } catch (error) {
      console.error('Error while Creating Chat', error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black', gap: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: rw(5),
          paddingHorizontal: rw(5),
          borderRadius: 10,
          gap: 20,
          elevation: 5,
        }}
      >
        <Text style={{ color: '#B0BEC5', fontWeight: '800', fontSize: rf(2) }}>
          To :
        </Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#B0BEC5'}
          style={{ fontWeight: '800', fontSize: rf(1.8), width: rw(73) }}
        ></TextInput>
      </View>

      <View style={{ marginHorizontal: rw(5), gap: 30 }}>
        <Text style={{ color: 'white', fontWeight: '800', fontSize: rf(2) }}>
          Suggested
        </Text>

        <FlatList
          data={contacts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => createChat(item)}>
              {/* profile */}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: rh(2),
                  gap: 20,
                }}
              >
                <View
                  style={{
                    height: rh(7),
                    width: rh(7),
                    backgroundColor: '#263238',
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={{ uri: item.avtar || '' }}
                    style={{ height: rh(7), width: rh(7), borderRadius: 50 }}
                  ></Image>
                </View>

                {/* name and last message */}

                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: rf(1.8),
                    }}
                  >
                    {item?.name ?? 'user'}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontWeight: '500',
                      fontSize: rf(2),
                    }}
                  >
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

const styles = StyleSheet.create({});
