import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import SignUpWithPhone from '../screens/SignUpWithPhone/SignUpWithPhone';
import SignUpWithEmail from '../screens/SignUpWithEmail/SignUpWithEmail';
import CreatePassword from '../screens/CreatePassword/CreatePassword';
import ContactSuggestion from '../screens/ContactSuggestion/ContactSuggestion';
import CreatePost from '../screens/CreatePost/CreatePost';
import SetStory from '../screens/SetStory/SetStory';
import Chat from '../screens/Chat/Chat';
import Splash from '../screens/Splash/Splash';
import Camera from '../components/Camera';
import Notification from '../components/Notification';
import TabNavigation from './TabNavigation';
import CloseBtn from '../components/CloseBtn';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Stack = createNativeStackNavigator();

const StackNavigation = ({ route }) => {
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

        {/* chat screen */}

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: () => (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: 'grey',
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={require('../assets/images/user1.jpg')}
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                    resizeMode="contain"
                  ></Image>
                </View>

                <View>
                  <Text style={{ color: 'white', fontWeight: '500' }}>
                    {route.params.username}
                  </Text>
                  <Text style={{ color: 'grey', fontWeight: '500' }}>
                    dipendra@123
                  </Text>
                </View>
              </View>
            ),
          })}
        ></Stack.Screen>

        <Stack.Screen
          name="SetStory"
          component={SetStory}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: '',
            headerBackVisible: false,
            headerLeft: () => <CloseBtn></CloseBtn>,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: '',
            headerBackVisible: false,
            headerLeft: () => <CloseBtn></CloseBtn>,
            headerRight: () => (
              <Text style={{ color: '#42A5F5', fontSize: 20 }}>Post</Text>
            ),
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
