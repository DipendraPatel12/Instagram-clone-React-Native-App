import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Camera from '../../components/Camera';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { rf, rh, rw } from '../../helper/responsive';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import styles from './ChatStyle';
import { FlashList } from '@shopify/flash-list';
const Chat = ({ route }) => {
  const flatListRef = useRef();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user } = useSelector(state => state.auth);
  const avatar = route?.params?.avatar;
  const oppositeUserId = route?.params?.oppositeUserId;

  const [activeChatId, setActiveChatId] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  console.log(selectedMessageId);
  // const messages = [
  //   'hii',
  //   'hello',
  //   'How are you ?',
  //   'i am good',
  //   'what are doing ?',
  //   'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf',
  //   'what do say ?',
  //   'ok',
  //   'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
  //   'How are you ?',
  //   'i am good',
  //   'what are doing ?',
  //   'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf sfsdfsd fsd d',
  //   'what do say ?',
  //   'ok',
  //   'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
  // ];

  useEffect(() => {
    getMessage();
  }, []);
  const getMessage = async () => {
    try {
      const existingChatSnapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', user.id)
        .get();

      const existingDoc = existingChatSnapshot.docs.find(doc =>
        doc.data().participants.includes(oppositeUserId),
      );
      const existingChat = existingDoc
        ? { id: existingDoc.id, ...existingDoc.data() }
        : null;

      setActiveChatId(existingChat?.id);

      const unsubscribe = firestore()
        .collection('chats')
        .doc(existingChat.id)
        .collection('messages')
        .orderBy('sendingTime', 'asc')
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMessages(messages);
        });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      if (messageText === '') return;

      if (activeChatId) {
        await firestore()
          .collection('chats')
          .doc(activeChatId)
          .collection('messages')
          .add({
            senderId: user.id,
            senderName: user.name,
            content: messageText,
            sendingTime: firestore.FieldValue.serverTimestamp(),
          });
      }

      setMessageText('');
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  };

  const deleteMessage = async () => {
    try {
      await firestore()
        .collection('chats')
        .doc(activeChatId)
        .collection('messages')
        .doc(selectedMessageId)
        .delete();
      setVisible(false);
    } catch (error) {
      console.error('Error while deleting message:', error);
    }
  };
  return (
    <View style={styles.container} onPress={() => setVisible(false)}>
      <FlashList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: item.senderId == user.id ? 'flex-end' : 'flex-start',
                gap: rw(2),
              }}
            >
              {item?.senderId == oppositeUserId && (
                <Image
                  source={{ uri: avatar }}
                  style={styles.profileImageStyle}
                />
              )}

              <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => {
                  setSelectedMessageId(item.id);
                  setVisible(!visible);
                }}
              >
                <Text
                  style={{
                    backgroundColor:
                      item?.senderId == user.id ? '#6A1B9A' : '#424242',
                    ...styles.messageTextStyle,
                  }}
                >
                  {item?.content}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        // contentContainerStyle={{ paddingBottom: 1 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {visible && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setVisible(false)}
        >
          <Pressable activeOpacity={1} style={styles.pressableBoxContainer}>
            <TouchableOpacity
              style={styles.pressableBtnContainer}
              onPress={() => deleteMessage()}
            >
              <FontAwesome5
                name="trash"
                color={'white'}
                size={15}
                iconStyle="solid"
              ></FontAwesome5>
              <Text style={styles.btnTextStyle}> Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pressableBtnContainer}>
              <FontAwesome5
                name="reply"
                color={'white'}
                size={15}
                iconStyle="solid"
              ></FontAwesome5>
              <Text style={styles.btnTextStyle}> Reply</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      )}

      {/* INPUT BAR */}
      <View style={styles.inputBoxContainer}>
        <View style={styles.inputBoxInnerContainer}>
          <View style={styles.cameraView}>
            <Camera />
          </View>

          <TextInput
            placeholder="Message..."
            placeholderTextColor="grey"
            style={styles.inputTextStyle}
            value={messageText}
            onChangeText={setMessageText}
          />

          <TouchableOpacity
            style={styles.sendBtnContainer}
            onPress={sendMessage}
          >
            <Text style={styles.sendTextStyle}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
