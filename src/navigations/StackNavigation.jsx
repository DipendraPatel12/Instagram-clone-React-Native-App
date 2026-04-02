import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import SignUpWithPhone from '../screens/SignUpWithPhone/SignUpWithPhone';
import SignUpWithEmail from '../screens/SignUpWithEmail/SignUpWithEmail';
import CreatePassword from '../screens/CreatePassword/CreatePassword';
import Home from '../screens/Home/Home';
import Camera from '../components/Camera';
import Notification from '../components/Notification';
import TabNavigation from './TabNavigation';
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="SignUpWithPhone"
          component={SignUpWithPhone}
          options={{
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: { backgroundColor: '#212121' },
            headerShadowVisible: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="SignUpWithEmail"
          component={SignUpWithEmail}
          options={{
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: { backgroundColor: '#212121' },
            headerShadowVisible: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: { backgroundColor: '#212121' },
            headerShadowVisible: false,
          }}
        ></Stack.Screen>

        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerBackVisible: false,
            headerLeft: () => <Camera></Camera>,
            headerTitleAlign: 'center',
            headerTitle: '𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎',
            headerTitleStyle: { fontSize: 25 },
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black' },
          }}
        ></Stack.Screen> */}

        <Stack.Screen
          name="MainTabs"
          component={TabNavigation}
          options={{
            headerBackVisible: false,
            headerLeft: () => <Camera></Camera>,
            headerRight: () => <Notification></Notification>,
            headerTitleAlign: 'center',
            headerTitle: '𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎',
            headerTitleStyle: { fontSize: 25 },
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black' },
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
