import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
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
import CreatePostBtn from '../components/CreatePostBtn';
import Notification from '../components/Notification';
import TabNavigation from './TabNavigation';
import CloseBtn from '../components/CloseBtn';
import ProfileHeader from '../components/ProfileHeader';
import SetUsername from '../screens/SetUsername/SetUsername';
import SearchedProfile from '../screens/SearchedProfile/SearchedProfile';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import DrawerNavigation from './DrawerNavigation';
import MessageContacts from '../components/MessageContacts';
import MainTabs from '../navigations/MainTabs';
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

        {/* <Stack.Screen
          name="MainTabs"
          component={TabNavigation}
          options={({ route }) => {
            const focusedTab = getFocusedRouteName(route);

            // Choose icons based on active tab
            let leftIcon = null;
            let rightIcon = null;

            switch (focusedTab) {
              case 'Home':
                leftIcon = <CreatePostBtn />;
                rightIcon = <Notification />;
                break;
              case 'Search':
                leftIcon = <CreatePostBtn />;
                rightIcon = <Notification />;
                break;
              case 'Message':
                rightIcon = <MessageContacts />;
                break;
              case 'Profile':
                leftIcon = <CreatePostBtn />;
                rightIcon = <Notification />;
                break;
              default:
                leftIcon = null;
                rightIcon = null;
            }

            return {
              headerTitle: getHeaderTitle(route),
              headerLeft: () => leftIcon,
              headerRight: () => rightIcon,
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            };
          }}
        /> */}
        {/* login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>

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

        {/* /Create Post */}
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
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
