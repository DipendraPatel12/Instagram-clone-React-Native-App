import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import StoriesSlider from '../../components/StoriesSlider';
import EmptyData from '../../components/EmptyData';
import firestore from '@react-native-firebase/firestore';
import { rf, rh, rw } from '../../helper/responsive';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/slices/authSlice';
import { getAuth } from '@react-native-firebase/auth';
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const des = `@dipendra  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet odit error saepe sequi tempore delenitis ed illo architecto natus perspiciatis! Officia ab adipisci quibusdam officiis beatae illum facere quaerat corporis `;
  // const des = 'sdf sfdsf sfsfsdf ';
  const [showMore, setShowMore] = useState(false);
  const [selectedShowMoreIndex, setSelectedShowMoreIndex] = useState();
  const [allPost, setAllPost] = useState([]);
  const user = getAuth().currentUser._user;
  console.log('user in home ', user);
  const Post = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(allPost);
  useEffect(() => {
    getPosts();
    dispatch(getUserProfile(user.uid));
  }, []);
  const getPosts = async () => {
    const posts = await firestore().collection('posts').get();
    console.log('data from posts collection', posts._docs);
    setAllPost(posts._docs);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      getPosts();
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <FlatList
          data={allPost}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['black']}
              tintColor="black"
              progressViewOffset={80}
            />
          }
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: rh(3), gap: rh(2) }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: rw(4),
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('SearchedProfile', {
                      id: item?._data?.uid,
                    })
                  }
                >
                  <View
                    style={{
                      height: rh(6),
                      width: rh(6),
                      backgroundColor: 'grey',
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={{ uri: item?._data?.post_media_url }}
                      style={{ height: rh(6), width: rh(6), borderRadius: 50 }}
                    ></Image>
                  </View>
                  <View>
                    <Text style={{ color: 'white' }}>
                      {item?._data?.username || 'Unknown'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <FontAwesome5
                    name="ellipsis-v"
                    size={15}
                    color="white"
                    iconStyle="solid"
                  />
                </TouchableOpacity>
              </View>

              {/* image */}
              <View style={{ height: rh(50), backgroundColor: '#37474F' }}>
                <Image
                  source={{ uri: item?._data?.post_media_url }}
                  style={{ height: rh(50), width: rw(100) }}
                  resizeMode="cover"
                ></Image>
              </View>

              <View
                style={{
                  marginHorizontal: rw(4),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: rh(1),
                }}
              >
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: rf(2),
                      }}
                    >
                      {25}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="comment" size={25} color="white" />
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: rf(2),
                      }}
                    >
                      {25}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: rf(2),
                      }}
                    >
                      {25}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: rf(2),
                      }}
                    >
                      {25}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity>
                    <FontAwesome5 name="bookmark" size={25} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginHorizontal: 20 }}>
                <View>
                  <Text style={{ color: 'white', fontSize: rf(1.8) }}>
                    {showMore && selectedShowMoreIndex === index
                      ? `${item?._data?.content} `
                      : `${item?._data?.content.substring(0, 90)}`}
                    {item?._data?.content.length > 90 && (
                      <Text
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'grey',
                          fontWeight: '500',
                        }}
                        onPress={() => {
                          setShowMore(!showMore);
                          setSelectedShowMoreIndex(index);
                        }}
                      >
                        {showMore && selectedShowMoreIndex === index
                          ? ' show less'
                          : ' show more'}
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListHeaderComponent={<StoriesSlider></StoriesSlider>}
          ListEmptyComponent={<EmptyData title={'Post'}></EmptyData>}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: Post.length === 0 ? 'center' : 'flex-start',
            alignItems: Post.length === 0 ? 'center' : 'stretch',
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
