import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import Camera from '../../components/Camera';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { rh, rw } from '../../helper/responsive';

const Chat = ({ route }) => {
  const [messageText, setMessageText] = useState('');
  const { user } = useSelector(state => state.auth);
  const chatId = route?.params?.chatId;
  const reverseChatId = route?.params?.reverseChatId;
  const avatar = route?.params?.avatar;
  useEffect(() => {
    getMessage();
  }, []);
  const getMessage = async () => {
    try {
      const chatRef = firestore().collection('chats');

      const chatIdCheck = await chatRef.doc(chatId).get();
      const reverseChatIdCheck = await chatRef.doc(reverseChatId).get();
      if (chatIdCheck.exists()) {
        const data = await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('message')
          .get();

        console.log('chatId res ', data);
        return;
      }
      if (reverseChatIdCheck.exists()) {
        const data = await firestore()
          .collection('chats')
          .doc(reverseChatIdCheck)
          .collection('message')
          .get();

        console.log('reversechatId res ', data);
        return;
      }
    } catch (error) {
      console.error('Error while Getting Messages');
    }
  };
  const messages = [
    'hii',
    'hello',
    'How are you ?',
    'i am good',
    'what are doing ?',
    'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf',
    'what do say ?',
    'ok',
    'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
    'How are you ?',
    'i am good',
    'what are doing ?',
    'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf sfsdfsd fsd d',
    'what do say ?',
    'ok',
    'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
  ];

  const sendMessage = async () => {
    try {
      const chatRef = firestore().collection('chats');

      const chatIdCheck = await chatRef.doc(chatId).get();
      const reverseChatIdCheck = await chatRef.doc(reverseChatId).get();

      if (chatIdCheck.exists()) {
        await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('message')
          .add({
            senderId: user.id,
            senderName: user.name,
            content: messageText,
            sendingTime: firestore.FieldValue.serverTimestamp(),
          });
      }

      setMessageText('');
    } catch (error) {
      console.error('Error while Sending Messages ', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <View style={{ marginTop: rh(2) }}>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: rh(3), marginHorizontal: rw(5) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: index % 2 == 0 ? 'flex-start' : 'flex-end',
                  gap: rw(2),
                }}
              >
                {index % 2 == 0 && (
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      height: rh(5),
                      width: rh(5),
                      borderRadius: 50,
                      backgroundColor: 'grey',
                    }}
                  ></Image>
                )}
                <View
                  style={{
                    backgroundColor: index % 2 == 0 ? '#424242' : '#6A1B9A',
                    paddingVertical: rh(1),
                    paddingHorizontal: rw(3),
                    borderRadius: 10,
                    elevation: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>{item}</Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'black',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: '#424242',
            borderRadius: 10,
            flexDirection: 'row',
            marginHorizontal: 10,
            paddingVertical: 5,
            alignItems: 'center',
            paddingHorizontal: 10,
            gap: 5,
          }}
        >
          <View
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 50,
              alignItems: 'center',
            }}
          >
            <Camera></Camera>
          </View>
          <View style={{ width: '70%' }}>
            <TextInput
              placeholder="Message..."
              placeholderTextColor="grey"
              style={{ width: '80%', color: 'white' }}
              value={messageText}
              onChangeText={text => setMessageText(text)}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#6A1B9A',
              padding: 5,
              borderRadius: 10,
            }}
            onPress={sendMessage}
          >
            <Text style={{ color: 'white', fontWeight: '500' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
