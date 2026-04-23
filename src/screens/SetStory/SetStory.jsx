import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { FlashList } from '@shopify/flash-list';
import EmptyData from '../../components/EmptyData';
import { rh, rw } from '../../helper/responsive';
const SetStory = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState();
  useEffect(() => {
    const getPhotos = async () => {
      const response = await CameraRoll.getPhotos({
        first: 25,
        assetType: 'All',
      });
      // console.log('Photos', response);
      setHasNextPage(response?.page_info?.has_next_page);
      setEndCursor(response?.page_info?.end_cursor);
      setData(response?.edges);
    };

    getPhotos();
  }, []);

  const loadMore = async () => {
    const response = await CameraRoll.getPhotos({
      first: 50,
      after: endCursor,
      assetType: 'All',
    });

    // console.log('respose from loadmore fn. ', response);
    setEndCursor(response?.page_info?.end_cursor);
    setHasNextPage(response?.page_info?.has_next_page);
    setData(prev => [...prev, ...response?.edges]);
  };

  // console.log('data', data);

  // const dData = [1, 2, 3, 4, 5];
  return (
    <View style={{ flex: 1, backgroundColor: '#263238' }}>
      {!data && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            gap: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '800',
            }}
          >
            Allow text to media
          </Text>
          <Text
            style={{ color: 'white', marginHorizontal: 20, fontWeight: '500' }}
          >
            To shate photos and videos, Instagram needs access to storage on
            your device.
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#2196F3',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Allow access
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlashList
        data={data}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() =>
              navigation.navigate('Step2', {
                url: item?.node?.image?.uri,
                type: item?.node?.type,
              })
            }
          >
            <Image
              source={{ uri: item?.node?.image?.uri }}
              style={{ width: rw(33.33), height: rh(20) }}
              resizeMode="cover"
            ></Image>
            {item?.node?.type === 'video/mp4' && (
              <Text
                style={{
                  color: 'white',
                  position: 'absolute',
                  top: 50,
                  left: 50,
                }}
              >
                ▶️
              </Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <EmptyData title={'No media'}></EmptyData>}
        contentContainerStyle={{ marginVertical: 5 }}
        onEndReached={() => hasNextPage && loadMore()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SetStory;

const styles = StyleSheet.create({});
