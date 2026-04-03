import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Home from '../screens/Home/Home';
import Message from '../screens/Message/Message';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        navigationBarColor: 'transparent',
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarItemStyle: { borderBottomWidth: 0 },
        tabBarIndicatorStyle: {
          borderBottomColor: 'white',
          height: '100%',
          backgroundColor: 'black',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
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
      ></Tab.Screen>
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="share"
              size={20}
              color={'white'}
              iconStyle="solid"
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="search"
              size={20}
              color="white"
              iconStyle="solid"
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            // <FontAwesome5
            //   name="user"
            //   size={20}
            //   color="white"
            //   iconStyle="solid"
            // />
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
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
