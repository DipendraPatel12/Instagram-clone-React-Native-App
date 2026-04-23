import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { rf, rh, rw } from '../helper/responsive';
import { runOnJS } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
const MessageItem = ({
  item,
  oppositeUserId,
  avatar,
  setSelectedMessageId,
  setVisible,
  setRepliedToMessage,
  setRepliedBoxVisible,
}) => {
  const { profile } = useSelector(state => state.profile);
  const translateX = useSharedValue(0);

  const handleReply = useCallback(
    (senderId, content, senderName, messageId) => {
      setRepliedToMessage({
        senderId,
        content,
        senderName,
        messageId,
      });
      setRepliedBoxVisible(true);
    },
    [],
  );

  const senderId = item.senderId;
  const content = item.content;
  const senderName = item.senderName;
  const messageId = item.id;

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX * 0.5;
    })
    .onEnd(() => {
      if (translateX.value > 50 || translateX.value < -50) {
        runOnJS(handleReply)(senderId, content, senderName, messageId);
      }

      translateX.value = withTiming(0, { duration: 200 });
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    
      <View style={[styles.itemContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: item.senderId == profile.id ? 'flex-end' : 'flex-start',
            gap: rw(2),
          }}
        >
          {item?.senderId == oppositeUserId && (
            <Image source={{ uri: avatar }} style={styles.profileImageStyle} />
          )}

          <View style={{ gap: 2 }}>
            {item?.replyTo && (
              <View style={{ gap: 3, marginRight: rw(10) }}>
                <Text style={{ color: 'grey', fontSize: rf(1.5) }}>
                  {item?.replyTo?.senderName == item.senderName
                    ? `${item?.replyTo?.senderName} replied`
                    : `you replied`}
                </Text>
                <Text
                  style={{
                    backgroundColor:
                      item?.senderId == profile.id ? '#8d64a6' : '#424242',
                    ...styles.repliedMessageTextStyle,
                  }}
                >
                  {item?.replyTo?.content}
                </Text>
              </View>
            )}
            <GestureDetector gesture={panGesture}>
              <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => {
                  setSelectedMessageId(item.id);
                  setVisible(true);
                }}
              >
                <Animated.View style={animatedStyle}>
                  <Text
                    style={{
                      backgroundColor:
                        item?.senderId == profile.id ? '#6A1B9A' : '#424242',
                      ...styles.messageTextStyle,
                    }}
                  >
                    {item?.content}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </GestureDetector>
          </View>
        </View>
      </View>
    
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: rh(3),
    paddingTop: rh(1),
    marginHorizontal: rw(2),
  },
  profileImageStyle: {
    height: rh(5),
    width: rh(5),
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  messageTextStyle: {
    color: 'white',
    padding: 10,
    borderRadius: 20,
    maxWidth: rw(70),
    flexWrap: 'wrap',
  },
  repliedMessageTextStyle: {
    color: 'white',
    padding: 10,
    borderRadius: 20,
    maxWidth: rw(70),
    flexWrap: 'wrap',
  },
});
