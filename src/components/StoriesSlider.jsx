import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const StoriesSlider = () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, marginHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              style={
                index == 0
                  ? { ...styles.storyStyle }
                  : { ...styles.storyStyle, ...styles.userStory }
              }
            >
              <Image
                source={require('../../src/assets/images/user1.jpg')}
                style={{ height: 80, width: 80, borderRadius: 50 }}
              ></Image>
            </TouchableOpacity>

            {index == 0 && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 25,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 3,
                  borderRadius: 50,
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '500',
                    height: 25,
                    width: 25,
                    borderRadius: 50,
                    textAlign: 'center',
                    backgroundColor: 'white',
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            )}
            <Text style={{ color: 'white', textAlign: 'center' }}>
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
    height: 90,
    width: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
