import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  style,
  backgroundColor = 'black',
  barStyle = 'light-content',
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {/* <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} /> */}
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
