import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../../services/cloudinary';
import firestore from '@react-native-firebase/firestore';
import {
  getUserProfile,
  updateProfile,
} from '../../../redux/slices/profileSlice';

import styles from './EditProfileStyle';
import { rf, rh, rw } from '../../../helper/responsive';

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(true);
  const [errorField, setErrorFiels] = useState('');
  const { profile, success, loading } = useSelector(state => state.profile);
  const type = route?.params?.type;
  const [previewImage, setPreviewImage] = useState(
    route?.params?.img || profile?.avtar || null,
  );
  const [userData, setUserData] = useState({
    name: profile?.name,
    username: profile?.username,
    bio: profile?.bio,
    avtar: profile?.avtar || null,
  });

  // console.log('userData', userData);

  const saveUpdatedProfile = async () => {
    if (userData.name === '') {
      setErrorFiels('name');
      setIsError(true);
      return;
    }
    if (userData.username === '') {
      setErrorFiels('username');
      setIsError(true);
      return;
    }
    if (userData.name === '' || userData.username)
      await dispatch(
        updateProfile({ previewImage, type, userData, userId: profile.id }),
      ).unwrap();

    navigation.navigate('MainTabs', {
      screen: 'Profile',
    });
  };
  return (
    <View style={styles.container}>
      {/* .profile section */}

      <View style={styles.profileUpdatorContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePostStep1', { from: 'EditProfile' })
          }
        >
          <Image
            source={{ uri: previewImage }}
            style={styles.profileImageStyle}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.editPictureTextStyle}>Edit picture or avtar</Text>
      </View>

      {/* textinput fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputBoxContainer}>
          <Text style={styles.inputPlaceHolderTextStyle}>Name</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.fieldTextStyle}
            value={userData.name}
            onChangeText={text => setUserData({ ...userData, name: text })}
          ></TextInput>
        </View>
        {isError && errorField === 'name' ? (
          <Text
            style={{
              color: 'red',
              fontSize: rf(1.5),
              marginHorizontal: rw(7),
            }}
          >
            username required!
          </Text>
        ) : null}

        <View style={styles.inputBoxContainer}>
          <Text style={styles.inputPlaceHolderTextStyle}>Username</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.fieldTextStyle}
            value={userData.username}
            onChangeText={text => setUserData({ ...userData, username: text })}
          ></TextInput>
        </View>

        {isError && errorField === 'username' ? (
          <Text
            style={{
              color: 'red',
              fontSize: rf(1.5),
              marginHorizontal: rw(7),
            }}
          >
            username required!
          </Text>
        ) : null}

        <View style={styles.inputBoxContainer}>
          <Text style={styles.inputPlaceHolderTextStyle}>Bio</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.fieldTextStyle}
            value={userData.bio}
            onChangeText={text => setUserData({ ...userData, bio: text })}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.updateBtnContainer}
          activeOpacity={0.8}
          onPress={saveUpdatedProfile}
        >
          {loading ? (
            <ActivityIndicator size={rh(5.5)}></ActivityIndicator>
          ) : (
            <Text style={styles.updateBtnTextStyle}>Update</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
