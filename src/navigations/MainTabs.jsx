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
import { useSelector } from 'react-redux';
import { rh, rw } from '../helper/responsive';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  const { user } = useSelector(state => state.auth);
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
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={20}
              color="white"
              iconStyle="solid"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerTitleAlign: 'center',
          headerTitle: user?.username || 'Unknown',
          headerTitleStyle: { fontSize: 20 },
          headerRight: () => <MessageContacts></MessageContacts>,
          tabBarIcon: () => (
            <FontAwesome5
              name="share"
              size={20}
              color="white"
              iconStyle="solid"
            />
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
            <FontAwesome5
              name="search"
              size={20}
              color="white"
              iconStyle="solid"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          headerTitle: user?.username || 'Unknown',
          headerTitleStyle: { fontSize: 20 },
          headerLeft: () => <CreatePostBtn></CreatePostBtn>,
          headerRight: () => <MessageContacts></MessageContacts>,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: user?.avtar }}
              style={{
                height: rh(3.5),
                width: rh(3.5),
                borderRadius: 50,
                borderWidth: rw(0.3),
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
