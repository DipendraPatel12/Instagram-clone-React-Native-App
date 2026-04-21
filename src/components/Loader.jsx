import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
