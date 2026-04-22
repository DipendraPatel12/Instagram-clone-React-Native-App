import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { rh, rw } from '../helper/responsive';
import { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
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
    <GestureDetector gesture={panGesture}>
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
        </View>
      </View>
    </GestureDetector>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: rh(3),
    paddingTop: rh(1),
    marginHorizontal: rw(5),
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
});
