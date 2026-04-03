import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import SignUpWithPhone from '../screens/SignUpWithPhone/SignUpWithPhone';
import SignUpWithEmail from '../screens/SignUpWithEmail/SignUpWithEmail';
import CreatePassword from '../screens/CreatePassword/CreatePassword';
import ContactSuggestion from '../screens/ContactSuggestion/ContactSuggestion';
import Splash from '../screens/Splash/Splash';
import Camera from '../components/Camera';
import Notification from '../components/Notification';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        ></Stack.Screen>
        {/* maintabs */}
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
        {/* login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* signup with phone */}
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

        {/* signup with email */}
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

        {/* createpassword */}
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

        {/* contact suggestion */}

        <Stack.Screen
          name="ContactSuggestion"
          component={ContactSuggestion}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: 'New messages',
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
