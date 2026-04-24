import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { rh, rw } from '../../helper/responsive';
import EmptyData from '../../components/EmptyData';
const Post = () => {
  const { myPosts, loading } = useSelector(state => state.posts);
  console.log('myPosts----> ', myPosts);
  if (loading) {
  }
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <FlashList
        data={myPosts}
        keyExtractor={item => item?.id.toString()}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item?.post_media_url }}
            style={{ width: rw(33), height: rh(30) }}
          ></Image>
        )}
        ListEmptyComponent={<EmptyData title={'No Post'}></EmptyData>}
      ></FlashList>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
