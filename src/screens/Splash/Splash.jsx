import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      const routeName = user ? 'MainTabs' : 'Login';
      navigation.dispatch(StackActions.replace(routeName));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
