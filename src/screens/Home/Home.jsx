import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import StoriesSlider from '../../components/StoriesSlider';
import EmptyData from '../../components/EmptyData';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const des = `@dipendra  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet odit error saepe sequi tempore delenitis ed illo architecto natus perspiciatis! Officia ab adipisci quibusdam officiis beatae illum facere quaerat corporis `;
  // const des = 'sdf sfdsf sfsfsdf ';
  const [showMore, setShowMore] = useState(false);
  const [selectedShowMoreIndex, setSelectedShowMoreIndex] = useState();
  const Post = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <FlatList
          data={Post}
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
            <View style={{ marginBottom: 10, gap: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: 'grey',
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={require('../../assets/images/user1.jpg')}
                      style={{ height: 45, width: 45, borderRadius: 50 }}
                    ></Image>
                  </View>
                  <View>
                    <Text style={{ color: 'white' }}>Dipendra</Text>
                  </View>
                </View>

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
              <View style={{ height: 400, backgroundColor: '#37474F' }}>
                <Image
                  source={require('../../assets/images/poster.jpg')}
                  style={{ height: 400, width: 400 }}
                  resizeMode="cover"
                ></Image>
              </View>

              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
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
                    <Text style={{ color: 'white', fontWeight: '500' }}>
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
                    <Text style={{ color: 'white', fontWeight: '500' }}>
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
                    <Text style={{ color: 'white', fontWeight: '500' }}>
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
                    <Text style={{ color: 'white', fontWeight: '500' }}>
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
                  <Text style={{ color: 'white' }}>
                    {showMore && selectedShowMoreIndex === index
                      ? `${des} `
                      : `${des.substring(0, 90)}`}
                    {des.length > 90 && (
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
