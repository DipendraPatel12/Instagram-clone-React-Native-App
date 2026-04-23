import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rh, rw } from '../../../helper/responsive';

const FullScreenStory = ({ route, navigation }) => {
  const { story } = route.params;

  console.log('Story ..', story);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: story.story_url }}
          style={{ height: rh(100), width: rw(100) }}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          top: rh(2),
          left: rh(2),
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 15,
        }}
        onPress={() =>
          navigation.navigate('SearchedProfile', {
            id: story.user_id,
            username: story.username,
          })
        }
      >
        <Image
          source={{ uri: story.avatar }}
          style={{ height: rh(5), width: rh(5), borderRadius: 50 }}
        ></Image>

        <Text style={{ color: 'white' }}>{story.username}</Text>
        <Text style={{ color: 'grey' }}>24h</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenStory;

const styles = StyleSheet.create({});
