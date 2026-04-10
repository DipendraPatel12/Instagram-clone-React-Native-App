import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import SignUpWithPhone from '../screens/SignUpWithPhone/SignUpWithPhone';
import SignUpWithEmail from '../screens/SignUpWithEmail/SignUpWithEmail';
import CreatePassword from '../screens/CreatePassword/CreatePassword';
import ContactSuggestion from '../screens/ContactSuggestion/ContactSuggestion';
import CreatePostStep1 from '../screens/CreatePost/CreatePostStep1/CreatePostStep1';
import CreatePostStep2 from '../screens/CreatePost/CreatePostStep2/CreatePostStep2';
import SetStory from '../screens/SetStory/SetStory';
import Chat from '../screens/Chat/Chat';
import Splash from '../screens/Splash/Splash';
import CreatePostBtn from '../components/CreatePostBtn';
import Notification from '../components/Notification';
import CloseBtn from '../components/CloseBtn';
import ProfileHeader from '../components/ProfileHeader';
import SetUsername from '../screens/SetUsername/SetUsername';
import SearchedProfile from '../screens/SearchedProfile/SearchedProfile';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

import MainTabs from '../navigations/MainTabs';
import EditProfile from '../screens/Profile/EditProfile/EditProfile';
import Step2 from '../screens/SetStory/Step2/Step2';
const Stack = createNativeStackNavigator();

const StackNavigation = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator>
        {/* ṣplash screen */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* maintabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            headerLeft: () => <CreatePostBtn></CreatePostBtn>,
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

        {/* setUser name */}
        <Stack.Screen
          name="SetUsername"
          component={SetUsername}
          options={{
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: { backgroundColor: '#212121' },
            headerShadowVisible: false,
          }}
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
              <ProfileHeader username={route?.params?.username}></ProfileHeader>
            ),
          })}
        ></Stack.Screen>

        {/* /set Story */}
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

        {/* set story step2 */}

        <Stack.Screen
          name="Step2"
          component={Step2}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* /Create Post */}
        <Stack.Screen
          name="CreatePostStep1"
          component={CreatePostStep1}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: 'New post',
            headerBackVisible: false,

            headerLeft: () => <CloseBtn></CloseBtn>,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreatePostStep2');
                }}
              >
                <Text style={{ color: '#42A5F5', fontSize: 20 }}>Next</Text>
              </TouchableOpacity>
            ),
          })}
        ></Stack.Screen>

        {/* /Create Post step2  */}
        <Stack.Screen
          name="CreatePostStep2"
          component={CreatePostStep2}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitle: '',
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="SearchedProfile"
          component={SearchedProfile}
          options={({ route }) => ({
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black' },
            headerTitle: route?.params?.username,

            headerRight: () => (
              <TouchableOpacity>
                <FontAwesome5
                  name="ellipsis-v"
                  size={15}
                  color="white"
                  iconStyle="solid"
                />
              </TouchableOpacity>
            ),
          })}
        ></Stack.Screen>

        {/* editProfile */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: 'Edit profile',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
