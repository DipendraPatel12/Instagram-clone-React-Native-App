import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProfileStyle';
import { clearUser } from '../../redux/slices/authSlice';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);

  const handleLogOut = async () => {
    try {
      dispatch(clearUser());
      await signOut(getAuth());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileAndUserDetailContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile?.avtar }}
              style={styles.profileImageStyle}
              resizeMode="cover"
            ></Image>
            <TouchableOpacity
              style={{}}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('SetStory')}
            >
              <Text style={styles.plusTextStyle}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 15 }}>
            <Text style={styles.usernameTextStyle}>
              {profile?.name || 'Unknown'}
            </Text>
            <View style={styles.countsContainer}>
              <View>
                <Text style={styles.countTextStyle}>
                  {profile?.postCount || '0'}
                </Text>
                <Text style={styles.countTextStyle}>Posts</Text>
              </View>
              <View>
                <Text style={styles.countTextStyle}>
                  {profile?.followersCount || '0'}
                </Text>
                <Text style={styles.countTextStyle}>followers</Text>
              </View>

              <View>
                <Text style={styles.countTextStyle}>
                  {profile?.followingCount || '0'}
                </Text>
                <Text style={styles.countTextStyle}>following</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.userBioContainer}>
        <Text style={styles.userBioTextStyle}>{profile?.bio}</Text>
      </View>

      <View style={styles.editAndlogoutContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.btnTextStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          activeOpacity={0.9}
          onPress={() => handleLogOut()}
        >
          <Text style={styles.btnTextStyle}>logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createPostContainer}>
        <Image
          source={require('../../assets/images/splash1.png')}
          style={styles.splashImageStyle}
        ></Image>

        <View style={{ gap: 10 }}>
          <Text style={styles.createPostTextStyle}>Create your first post</Text>
          <Text style={styles.createPostText2Style}>
            Give this spave some love
          </Text>
        </View>

        {/* create buttonn */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePostStep1')}
          style={{ backgroundColor: '#1976D2', borderRadius: 10 }}
        >
          <Text style={styles.createBtnTextStyle}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={{
          backgroundColor: '#1976D2',
          borderRadius: 10,
          marginHorizontal: rw(10),
        }}
        onPress={() => handleLogOut()}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            padding: 10,
            fontSize: rf(2),
          }}
        >
          logout
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Profile;
