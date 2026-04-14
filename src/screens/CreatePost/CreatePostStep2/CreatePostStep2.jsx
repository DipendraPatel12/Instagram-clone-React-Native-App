import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { rf, rh, rw } from '../../../helper/responsive';
import { uploadToCloudinary } from '../../../services/cloudinary';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const CreatePostStep2 = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [text, setText] = useState(false);
  const { img, type } = route?.params;

  const { user } = useSelector(state => state.auth);

  // console.log('user from redux ', user);

  const [uploading, setUploading] = useState(false);
  console.warn(img, type);

  const uploadPost = async () => {
    setUploading(true);
    if (img === '') {
      return;
    }
    try {
      const url = await uploadToCloudinary(img, type);
      await firestore()
        .collection('posts')
        .add({
          user_id: user.id,
          username: user?.username || 'Unknown',
          post_media_url: url,
          content: content,
        });

      setUploading(false);
      navigation.navigate('MainTabs');
    } catch (error) {
      console.log('Error while uploading post', error);
      return;
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: rh(70),
        }}
      >
        <Image
          source={{ uri: img }}
          style={{ width: rw(100), height: rh(50) }}
        ></Image>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh(3),
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              height: rh(6),
              width: rw(20),
              borderRadius: 10,
              backgroundColor: '#263238',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={{ color: 'white', fontSize: rf(2) }}>Aa</Text>
            <Text
              style={{ color: 'white', fontWeight: '500', fontSize: rf(1.5) }}
            >
              Text
            </Text>
          </TouchableOpacity>

          {text && content !== '' && (
            <>
              <View
                style={{
                  backgroundColor: '#263238',
                  width: rw(90),
                  borderRadius: 10,
                  flexDirection: 'row',
                }}
              >
                <View style={{ width: rw(80) }}>
                  <Text style={{ color: 'white', padding: 10 }}>{content}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setContent('');
                    setText(false);
                  }}
                >
                  <Text style={{ color: 'white', padding: 10 }}>*</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1976D2',
            width: rw(20),
            height: rh(5),
            borderRadius: 10,
            marginRight: rh(5),
            marginBottom: rh(5),
          }}
          onPress={uploadPost}
        >
          <Text style={{ color: 'white', fontWeight: '800' }}>
            {uploading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
      >
        <View
          style={{
            flex: 1 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: rh(1), right: rw(8) }}
            onPress={() => {
              setVisible(!visible);
              setText(true);
            }}
          >
            <Text
              style={{ color: 'white', fontWeight: '600', fontSize: rf(2.5) }}
            >
              Done
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="write here..."
            style={{
              color: 'white',
              backgroundColor: 'black',
              marginHorizontal: rw(3),
              borderRadius: 10,
            }}
            multiline
            autoFocus
            value={content}
            onChangeText={text => setContent(text)}
          ></TextInput>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePostStep2;

const styles = StyleSheet.create({});
