import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { rf, rh, rw } from '../helper/responsive';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';

const StoriesSlider = () => {
  // const stories = [1, 2, 3, 4, 5, 6, 7, 8];


  const navigation = useNavigation();

  const { profile } = useSelector(state => state.profile);
  const { stories } = useSelector(state => state.story);
  return (
    <>
      <FlashList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: rh(1),
          marginHorizontal: rw(2),
        }}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: rw(5) }}>
            <TouchableOpacity
              style={
                index === 0
                  ? { ...styles.storyStyle }
                  : { ...styles.storyStyle, ...styles.userStory }
              }
              onPress={() => {
                if (index === 0) {
                  if (item?.isMyStory) {
                    navigation.navigate('FullScreenStory', {
                      story: item,
                    });
                  } else {
                    navigation.navigate('Gallery');
                  }
                } else {
                  navigation.navigate('FullScreenStory', {
                    story: item,
                  });
                }
              }}
            >
              <Image
                source={{
                  uri: index === 0 ? profile?.avtar : item?.avatar,
                }}
                style={styles.imageStyle}
              ></Image>
            </TouchableOpacity>

            {index == 0 && (
              <TouchableOpacity
                style={styles.storyUploadContainer}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Gallery');
                }}
              >
                <Text style={styles.plusTextStyle}>+</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.usernameText}>
              {index === 0 ? 'Your story' : item?.username}
            </Text>
          </View>
        )}
      ></FlashList>
    </>
  );
};

export default StoriesSlider;

const styles = StyleSheet.create({
  userStory: { borderWidth: 3, borderColor: '#FF80AB' },
  storyStyle: {
    height: rh(11),
    width: rh(11),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageStyle: {
    height: rh(9.5),
    width: rh(9.5),
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  storyUploadContainer: {
    position: 'absolute',
    bottom: rh(3),
    right: rw(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: rw(0.5),
    borderRadius: 50,
    height: rh(3.5),
    width: rh(3.5),
    backgroundColor: 'white',
  },
  plusTextStyle: {
    color: 'black',
    fontSize: rf(2),
    fontWeight: '500',

    borderRadius: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  usernameText: {
    color: 'white',
    textAlign: 'center',
    fontSize: rf(1.7),
  },
});
