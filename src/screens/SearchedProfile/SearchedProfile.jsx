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
import { useSelector } from 'react-redux';
import { rf, rh, rw } from '../../helper/responsive';
const SearchedProfile = ({ route }) => {
  const id = route?.params?.id;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [justFollowed, setJustFollowed] = useState(false);

  const { user } = useSelector(state => state.auth);
  // console.log('userData', userData);
  useEffect(() => {
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

        const usersPosts = await firestore()
          .collection('posts')
          .where('user_id', '==', id)
          .get();
        const user = userDetails.data();
        // console.log('user data', user, userFollow.size, userFollowing.size);
        setLoading(false);

        setUserData({
          ...user,
          postCount: usersPosts.size,
          followersCount: userFollow.size,
          followingCount: userFollowing.size,
        });
      } catch (error) {
        console.error('Error While Getting User Data', error);
      }
    };

    getUserProfile();
  }, [route.params.id]);

  const followUser = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(id)
        .collection('followers')
        .where('id', '==', user.id)
        .get();

      snapshot.forEach(doc => {
        console.warn(doc);
      });
      // console.warn(' i am exists or not', check,check._docs());

      // const res = await firestore()
      //   .collection('users')
      //   .doc(id)
      //   .collection('followers')
      //   .add({ id: user.id });

      // setJustFollowed(true);
      // console.warn('userfollow fn called', res);
    } catch (error) {
      console.error('Error while Following user', error);
    }
  };

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
      <View style={{ marginHorizontal: rw(5), marginTop: rh(1) }}>
        <View style={{ flexDirection: 'row', gap: rw(6) }}>
          <View
            style={{
              height: rh(10),
              width: rh(10),
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'relative',
            }}
          >
            <Image
              source={{ uri: userData?.avtar }}
              style={{ height: rh(10), width: rh(10), borderRadius: 50 }}
              resizeMode="cover"
            ></Image>
            <TouchableOpacity
              style={{
                height: rh(3),
                width: rh(3),
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: rw(0.5),
                elevation: 1,
                position: 'absolute',
                bottom: rh(0.1),
                right: rw(0.5),
              }}
              activeOpacity={0.9}
            >
              <Text style={{ fontSize: rf(1.8) }}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: rh(2) }}>
            <Text style={{ color: 'white', fontWeight: '800' }}>
              {userData.name || 'User'}
            </Text>
            <View style={{ flexDirection: 'row', gap: rw(10) }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  {userData?.postCount || 0}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  Posts
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  {userData?.followersCount || 0}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  followers
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  {userData?.followingCount || 0}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.7),
                  }}
                >
                  following
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: rw(5), marginTop: rh(3) }}>
        <Text style={{ color: 'white', fontWeight: '700', fontSize: rf(1.7) }}>
          {userData?.bio}
        </Text>
      </View>
      {/* <View style={{ marginHorizontal: 20, marginTop: 15 }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>
          @dipendra_patel
        </Text>
      </View> */}

      {/* <TouchableOpacity
        style={{
          backgroundColor: '#2979FF',
          marginHorizontal: 20,
          borderRadius: 10,
          marginVertical: 10,
        }}
        onPress={followUser}
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
      </TouchableOpacity> */}

      {justFollowed ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#37474F',
              marginHorizontal: rw(5),
              borderRadius: 10,
              marginVertical: rh(2),
              padding: 10,
              paddingHorizontal: rw(10),
            }}
          >
            <Text
              style={{ color: 'white', textAlign: 'center', fontSize: rf(1.7) }}
            >
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#37474F',
              marginHorizontal: rw(5),
              borderRadius: 10,
              marginVertical: rh(2),
              padding: 10,
              paddingHorizontal: rw(10),
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
      ) : (
        // <TouchableOpacity
        //   style={{
        //     backgroundColor: 'grey',
        //     marginHorizontal: rw(5),
        //     borderRadius: 10,
        //     marginVertical: rh(2),
        //   }}
        //   // onPress={followUser}
        // >
        //   <Text
        //     style={{
        //       textAlign: 'center',
        //       padding: 10,
        //       color: 'white',
        //       fontWeight: '600',
        //       fontSize: rf(1.7),
        //     }}
        //   >
        //     Following
        //   </Text>
        // </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#2979FF',
            marginHorizontal: rw(5),
            borderRadius: 10,
            marginVertical: rh(2),
          }}
          onPress={followUser}
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
      )}

      {/* {false && (
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
      )} */}
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
