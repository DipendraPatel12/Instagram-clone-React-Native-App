import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { rf, rh, rw } from '../../../helper/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../../services/cloudinary';
import firestore from '@react-native-firebase/firestore';
import { getUserProfile } from '../../../redux/slices/authSlice';

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const type = route?.params?.type;
  const [previewImage, setPreviewImage] = useState(
    route?.params?.img || user?.avtar || '',
  );
  const [userData, setUserData] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    avtar: '',
  });

  // console.log('userData', userData);

  const updateProfile = async () => {
    try {
      // console.log('update fn called');
      const url = await uploadToCloudinary(previewImage, type);
      const updatedData = { ...userData, avtar: url };
      const data = await firestore()
        .collection('users')
        .doc(user.id)
        .update(updatedData);

      dispatch(getUserProfile(user.id));

      navigation.navigate('MainTabs', {
        screen: 'Profile',
      });
    } catch (error) {
      console.error('Error while Updating user Details.', error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* .profile section */}

      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreatePostStep1', { from: 'EditProfile' })
          }
        >
          <Image
            source={{ uri: previewImage }}
            style={{
              width: rh(10),
              height: rh(10),
              borderRadius: 50,
              backgroundColor: 'grey',
            }}
          ></Image>
        </TouchableOpacity>
        <Text
          style={{ color: '#1976D2', fontSize: rf(1.8), fontWeight: '500' }}
        >
          Edit picture or avtar
        </Text>
      </View>

      {/* textinput fields */}
      <View style={{ gap: 20, marginVertical: rh(5) }}>
        <View
          style={{
            backgroundColor: '#212121',
            marginHorizontal: rw(5),
            paddingHorizontal: 10,
            borderRadius: 10,
            borderColor: 'grey',
            borderWidth: 0.5,
          }}
        >
          <Text style={{ color: 'grey' }}>Name</Text>
          <TextInput
            placeholderTextColor="grey"
            style={{
              color: 'white',
              fontSize: rf(1.8),
            }}
            value={userData.name}
            onChangeText={text => setUserData({ ...userData, name: text })}
          ></TextInput>
        </View>

        <View
          style={{
            backgroundColor: '#212121',
            marginHorizontal: rw(5),
            paddingHorizontal: 10,
            borderRadius: 10,
            borderColor: 'grey',
            borderWidth: 0.5,
          }}
        >
          <Text style={{ color: 'grey' }}>Username</Text>
          <TextInput
            placeholderTextColor="grey"
            style={{
              color: 'white',
              fontSize: rf(1.8),
            }}
            value={userData.username}
            onChangeText={text => setUserData({ ...userData, username: text })}
          ></TextInput>
        </View>

        <View
          style={{
            backgroundColor: '#212121',
            marginHorizontal: rw(5),
            paddingHorizontal: 10,
            borderRadius: 10,
            borderColor: 'grey',
            borderWidth: 0.5,
          }}
        >
          <Text style={{ color: 'grey' }}>Bio</Text>
          <TextInput
            placeholderTextColor="grey"
            style={{
              color: 'white',
              fontSize: rf(1.8),
            }}
            value={userData.bio}
            onChangeText={text => setUserData({ ...userData, bio: text })}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#1976D2',
            marginHorizontal: rw(5),
            padding: 5,
            borderRadius: 5,
            borderWidth: 0.3,
            borderColor: 'white',
          }}
          activeOpacity={0.8}
          onPress={updateProfile}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '800',
              textAlign: 'center',
              fontSize: rf(1.8),
              padding: 13,
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
