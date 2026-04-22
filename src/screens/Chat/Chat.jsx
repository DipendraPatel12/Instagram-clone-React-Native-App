import {
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MessageItem from '../../components/MessageItem';
const Chat = ({ route }) => {
  const flatListRef = useRef();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [repliedToMessage, setRepliedToMessage] = useState({
    senderId: null,
    content: null,
    senderName: null,
    messageId: null,
  });
  const [repliedBoxVisible, setRepliedBoxVisible] = useState(false);
  const { profile } = useSelector(state => state.profile);
  const avatar = route?.params?.avatar;
  const oppositeUserId = route?.params?.oppositeUserId;

  const [activeChatId, setActiveChatId] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  // console.log(selectedMessageId);
  // const messages = [
  //   'hii',
  //   'hello',
  //   'How are you ?',
  //   'i am good',
  // ];

  useEffect(() => {
    getMessage();
  }, []);
  const getMessage = async () => {
    try {
      const existingChatSnapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', profile.id)
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
            senderId: profile.id,
            senderName: profile.name,
            content: messageText,
            sendingTime: firestore.FieldValue.serverTimestamp(),
            replyTo: repliedBoxVisible
              ? {
                  ...repliedToMessage,
                }
              : null,
          });
      }

      setMessageText('');
      setRepliedBoxVisible(false);
      setRepliedToMessage({
        senderId: null,
        content: null,
        senderName: null,
        messageId: null,
      });
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
    <GestureHandlerRootView>
      <View style={styles.container} onPress={() => setVisible(false)}>
        <FlashList
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ref={flatListRef}
          renderItem={({ item }) => {
            const props = {
              item,
              profile,
              avatar,
              oppositeUserId,
              setSelectedMessageId,
              setVisible,
              setRepliedToMessage,
              setRepliedBoxVisible,
            };

            return <MessageItem {...props} />;
          }}
          contentContainerStyle={{ paddingBottom: 1 }}
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
        {repliedBoxVisible && (
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopColor: '#424242',
              borderWidth: 0.19,
              alignItems: 'center',
            }}
          >
            <View style={{ marginHorizontal: rw(5), padding: 5 }}>
              <Text style={{ color: '#B0BEC5', fontSize: rf(1.4) }}>
                {repliedToMessage.senderName == profile.name
                  ? 'Reply to myself'
                  : `Reply to ${repliedToMessage?.senderName}`}
              </Text>
              <Text style={{ color: 'white', fontSize: rf(1.4) }}>
                {repliedToMessage.content}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setRepliedBoxVisible(false);
                setRepliedToMessage({
                  senderId: null,
                  content: null,
                  senderName: null,
                  messageId: null,
                });
              }}
              style={{ marginHorizontal: rw(5) }}
            >
              <FontAwesome5
                name="times"
                color={'white'}
                size={15}
                iconStyle="solid"
              ></FontAwesome5>
            </TouchableOpacity>
          </View>
        )}
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

            <FontAwesome5
              name="images"
              size={18}
              color={'white'}
              iconStyle="solid"
            ></FontAwesome5>

            <TouchableOpacity
              style={styles.sendBtnContainer}
              onPress={sendMessage}
            >
              <Text style={styles.sendTextStyle}>
                <FontAwesome5
                  name="paper-plane"
                  size={15}
                  color={'white'}
                  iconStyle="solid"
                ></FontAwesome5>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Chat;

//@#7899@#
