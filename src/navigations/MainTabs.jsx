import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Message from '../screens/Message/Message';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import CreatePostBtn from '../components/CreatePostBtn';
import Notification from '../components/Notification';
import MessageContacts from '../components/MessageContacts';
import SearchProfile from '../components/SearchProfile';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'black',
          height: 60,
          borderTopWidth: 0,
          borderTopColor: 'white',
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        tabBarItemStyle: {
          marginVertical: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitle: '𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎',
          headerTitleStyle: { fontSize: 25 },
          headerLeft: () => <CreatePostBtn></CreatePostBtn>,
          headerRight: () => <Notification></Notification>,
          tabBarIcon: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="home"
                size={20}
                color="white"
                iconStyle="solid"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'dipendra_patel926',
          headerTitleStyle: { fontSize: 20 },
          headerRight: () => <MessageContacts></MessageContacts>,
          tabBarIcon: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="share"
                size={20}
                color="white"
                iconStyle="solid"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          //   headerLeft: () => <SearchProfile></SearchProfile>,
          headerShown: false,
          tabBarIcon: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="search"
                size={20}
                color="white"
                iconStyle="solid"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'dipendra_patel934',
          headerTitleStyle: { fontSize: 20 },
          headerLeft: () => <CreatePostBtn></CreatePostBtn>,
          headerRight: () => <MessageContacts></MessageContacts>,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../src/assets/images/user1.jpg')}
              style={{
                height: 28,
                width: 28,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'white',
              }}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
