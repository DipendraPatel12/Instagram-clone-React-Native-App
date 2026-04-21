import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { rf, rh, rw } from '../../helper/responsive';
import styles from './SearchedProfileStyle';
import {
  getSearchedProfile,
  toggleFollow,
} from '../../redux/slices/profileSlice';
import Loader from '../../components/Loader';
const SearchedProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const id = route?.params?.id;
  const { profile, searchedProfile, loading } = useSelector(
    state => state.profile,
  );
  console.log('SEARC', searchedProfile);
  useEffect(() => {
    dispatch(getSearchedProfile({ id, userId: profile?.id }));
  }, [route.params.id]);

  const followUser = async () => {
    // try {
    //   await firestore()
    //     .collection('users')
    //     .doc(id)
    //     .collection('followers')
    //     .doc(profile.id)
    //     .set({});

    //   await firestore()
    //     .collection('users')
    //     .doc(profile.id)
    //     .collection('followings')
    //     .doc(id)
    //     .set({});

    //   console.log('followed');
    // } catch (error) {
    //   console.error('Error while Following user', error);
    // }
    dispatch(toggleFollow({ id, userId: profile?.id }));
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.profileAndCountContainer}>
        <View style={styles.profileCountInnerContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: searchedProfile?.avtar }}
              style={styles.profileImageStyle}
              resizeMode="cover"
            ></Image>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>

          <View style={styles.usernameAndCountContainer}>
            <Text style={styles.usernameTextStyle}>
              {searchedProfile.name || 'User'}
            </Text>
            <View style={styles.countContainer}>
              <View>
                <Text style={styles.countContainerTextStyle}>
                  {searchedProfile?.postCount || 0}
                </Text>
                <Text style={styles.countContainerTextStyle}>Posts</Text>
              </View>
              <View>
                <Text style={styles.countContainerTextStyle}>
                  {searchedProfile?.followersCount || 0}
                </Text>
                <Text style={styles.countContainerTextStyle}>followers</Text>
              </View>

              <View>
                <Text style={styles.countContainerTextStyle}>
                  {searchedProfile?.followingCount || 0}
                </Text>
                <Text style={styles.countContainerTextStyle}>following</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bioTextStyle}>{searchedProfile?.bio}</Text>
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

      {searchedProfile?.isFollowed ? (
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
            onPress={followUser}
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
            onPress={() =>
              navigation.navigate('Chat', {
                username: searchedProfile?.username,
                name: searchedProfile?.name,
                avatar: searchedProfile?.avtar,
                oppositeUserId: searchedProfile?.id,
              })
            }
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
      {!searchedProfile?.isFollowed && (
        <View style={styles.accountPrivateContainer}>
          <View style={styles.lockContainer}>
            <FontAwesome5
              name="lock"
              size={20}
              color={'white'}
              iconStyle="solid"
            ></FontAwesome5>
          </View>

          <View style={styles.accountInnerContainer}>
            <Text style={styles.accountText1Style}>
              This account is private
            </Text>
            <Text style={styles.accountText2Style}>
              Follow this profile to see their photos and videos.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchedProfile;
