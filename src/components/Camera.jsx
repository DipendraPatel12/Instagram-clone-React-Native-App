import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
const Camera = () => {
  return (
    <>
      <TouchableOpacity>
        <FontAwesome5 name="camera" size={20} color="white" iconStyle="solid" />
      </TouchableOpacity>
    </>
  );
};

export default Camera;

const styles = StyleSheet.create({});
