import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const CloseBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginHorizontal: 15 }}
    >
      <FontAwesome5 name="times" size={25} color="white" iconStyle="solid" />
    </TouchableOpacity>
  );
};

export default CloseBtn;

const styles = StyleSheet.create({});
