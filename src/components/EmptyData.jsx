import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EmptyData = ({ title }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({});
