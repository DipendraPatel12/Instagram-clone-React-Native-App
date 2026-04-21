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

import { uploadToCloudinary } from '../../../services/cloudinary';

import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import styles from './CreatePostStep2Style';

const CreatePostStep2 = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [text, setText] = useState(false);
  const { img, type } = route?.params;

  const { profile } = useSelector(state => state.profile);

  // console.log('profile from redux ', profile);

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
          user_id: profile.id,
          username: profile?.username || 'Unknown',
          userAvatar: profile?.avtar,
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
    <View style={styles.container}>
      <View style={styles.previewImageContainer}>
        <Image source={{ uri: img }} style={styles.previewImageStyle}></Image>
        <View style={styles.contentSetter}>
          <TouchableOpacity
            style={styles.textSetterBox}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={styles.textSetterStyle}>Aa</Text>
            <Text style={styles.textSetter2Style}>Text</Text>
          </TouchableOpacity>

          {text && content !== '' && (
            <>
              <View style={styles.postDetailContainer}>
                <View style={styles.showPostDescContainer}>
                  <Text style={styles.postDetailTextStyle}>{content}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setContent('');
                    setText(false);
                  }}
                >
                  <Text style={styles.removeContentStyle}>
                    <FontAwesome5
                      name={'trash'}
                      color={'white'}
                      size={10}
                      iconStyle="solid"
                    ></FontAwesome5>
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.postingContainer}>
        <TouchableOpacity style={styles.postBtnContainer} onPress={uploadPost}>
          <Text style={styles.postTextStyle}>
            {uploading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.doneBtnContainer}
            onPress={() => {
              setVisible(!visible);
              setText(true);
            }}
          >
            <Text style={styles.doneBtnTextStyle}>Done</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="write here..."
            style={styles.inputTextStyle}
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
