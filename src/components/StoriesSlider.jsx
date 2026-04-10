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

const StoriesSlider = () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigation = useNavigation();

  const { user } = useSelector(state => state.auth);
  return (
    <>
      <FlatList
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
                index == 0
                  ? { ...styles.storyStyle }
                  : { ...styles.storyStyle, ...styles.userStory }
              }
              onPress={() => {
                if (index == 0) {
                  navigation.navigate('SetStory');
                }
              }}
            >
              <Image
                source={{ uri: index === 0 ? user?.avtar : '' }}
                style={{ height: rh(10), width: rh(10), borderRadius: 50 }}
              ></Image>
            </TouchableOpacity>

            {index == 0 && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: rh(2),
                  right: rw(0),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: rw(0.5),
                  borderRadius: 50,
                  height: rh(3.5),
                  width: rh(3.5),
                  backgroundColor: 'white',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: 'black',
                    fontSize: rf(2),
                    fontWeight: '500',

                    borderRadius: 50,
                    textAlign: 'center',
                    backgroundColor: 'white',
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            )}
            <Text
              style={{ color: 'white', textAlign: 'center', fontSize: rf(1.7) }}
            >
              {index === 0 ? 'your story' : ' Dipendra'}
            </Text>
          </View>
        )}
      ></FlatList>
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
});
