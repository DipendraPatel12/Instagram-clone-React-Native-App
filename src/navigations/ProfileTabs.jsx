import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import Post from '../screens/Post/Post';
import Reels from '../screens/Reels/Reels';
const ProfileTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
          marginTop: 10,
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tab.Screen name="Post" component={Post}></Tab.Screen>
      <Tab.Screen name="Reels" component={Reels}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({});
