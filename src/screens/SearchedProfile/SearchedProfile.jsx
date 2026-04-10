import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import firestore from '@react-native-firebase/firestore';
const SearchedProfile = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  console.log('userData', userData);
  useEffect(() => {
    const id = route?.params?.id;
    const getUserProfile = async () => {
      try {
        const userDetails = await firestore().collection('users').doc(id).get();

        const userFollow = await firestore()
          .collection('users')
          .doc(id)
          .collection('followers')
          .get();

        const userFollowing = await firestore()
          .collection('users')
          .doc(id)
          .collection('followings')
          .get();

        const usersPosts = await firestore().collection('posts');
        const user = userDetails.data();
        console.log('user data', user, userFollow.size, userFollowing.size);
        setLoading(false);

        setUserData({
          ...user,
          followersCount: userFollow.size,
          followingCount: userFollowing.size,
        });
      } catch (error) {
        console.error('Error While Getting User Data', error);
      }
    };

    getUserProfile();
  }, [route.params.id]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginHorizontal: 20, marginTop: 15 }}>
        <View style={{ flexDirection: 'row', gap: 30 }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'relative',
            }}
          >
            <Image
              source={require('../../assets/images/user1.jpg')}
              style={{ height: 80, width: 80, borderRadius: 50 }}
              resizeMode="contain"
            ></Image>
            <TouchableOpacity
              style={{
                height: 25,
                width: 25,
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                elevation: 1,
                position: 'absolute',
                bottom: 1,
                right: 2,
              }}
              activeOpacity={0.9}
            >
              <Text style={{ fontSize: 15 }}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 15 }}>
            <Text style={{ color: 'white', fontWeight: '800' }}>
              Dipendra Patel
            </Text>
            <View style={{ flexDirection: 'row', gap: 40 }}>
              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>0</Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>Posts</Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  {userData?.followersCount || 0}
                </Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  followers
                </Text>
              </View>

              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  {userData?.followingCount || 0}
                </Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  following
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>
          ⭐😊Bio@SF F SF
        </Text>
        <Text style={{ color: 'white', fontWeight: '700' }}>Bio⭐😊</Text>
        <Text style={{ color: 'white', fontWeight: '700' }}>Description</Text>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 15 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>
          @dipendra_patel
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#2979FF',
          marginHorizontal: 20,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            padding: 10,
            color: 'white',
            fontWeight: '600',
          }}
        >
          Follow
        </Text>
      </TouchableOpacity>

      {false && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#37474F',
              padding: 10,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#37474F',
              padding: 10,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#37474F',
            borderRadius: 50,
          }}
        >
          <FontAwesome5
            name="lock"
            size={20}
            color={'white'}
            iconStyle="solid"
          ></FontAwesome5>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '800' }}>
            This account is private
          </Text>
          <Text style={{ color: 'white', fontWeight: '400', width: '80%' }}>
            Follow this profile to see their photos and videos.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SearchedProfile;

const styles = StyleSheet.create({});
