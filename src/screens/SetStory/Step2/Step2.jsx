import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rf, rh, rw } from '../../../helper/responsive';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../../services/cloudinary';
import firestore from '@react-native-firebase/firestore';
const Step2 = ({ route, navigation }) => {
  const { url, type } = route?.params || '';
  const { user } = useSelector(state => state.auth);

  const postStory = async () => {
    // console.log('called');
    const now = new Date();
    const storyUrl = await uploadToCloudinary(url, type);
    await firestore()
      .collection('stories')
      .doc(user.id)
      .collection('list')
      .add({
        user_id: user.id,
        username: user.username,
        avatar: user.avtar || '',
        story_url: storyUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      });
    navigation.navigate('MainTabs', {
      screen: 'Home',
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          marginHorizontal: rw(3),
          position: 'absolute',
          zIndex: 5,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#424242',
            width: rh(6),
            height: rh(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name="arrow-left"
            size={25}
            color="white"
            iconStyle="solid"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>

      {/* image */}
      <View>
        <Image
          source={{ uri: url }}
          style={{ width: rw(100), height: rh(80), borderRadius: 30 }}
        ></Image>
      </View>

      <View
        style={{
          marginBottom: rh(5),
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: rw(5),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#1E88E5',
            width: rh(6),
            height: rh(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          activeOpacity={0.8}
          onPress={postStory}
        >
          <FontAwesome5
            name="arrow-right"
            size={25}
            color="white"
            iconStyle="solid"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({});
