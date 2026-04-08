import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useNavigation } from '@react-navigation/native';

const CreatePostBtn = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePost')}
        style={{ marginLeft: 10 }}
      >
        <FontAwesome5 name="plus" size={25} color="white" iconStyle="solid" />
      </TouchableOpacity>
    </>
  );
};

export default CreatePostBtn;

const styles = StyleSheet.create({});
