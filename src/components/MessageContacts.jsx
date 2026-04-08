import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useNavigation } from '@react-navigation/native';

const MessageContacts = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ContactSuggestion')}
      style={{ marginRight: 10 }}
    >
      <FontAwesome5 name="edit" size={25} color="white" />
    </TouchableOpacity>
  );
};

export default MessageContacts;

const styles = StyleSheet.create({});
