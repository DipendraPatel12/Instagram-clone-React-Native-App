import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { rf, rh, rw } from '../../helper/responsive';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);

  const handleLogOut = async () => {
    try {
      await signOut(getAuth());
      // navigation.navigate('Login');
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginHorizontal: rw(5) }}>
        <View style={{ flexDirection: 'row', gap: 30 }}>
          <View
            style={{
              height: rh(10),
              width: rh(10),
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'relative',
            }}
          >
            <Image
              source={{ uri: user?.avtar }}
              style={{ height: rh(10), width: rh(10), borderRadius: 50 }}
              resizeMode="cover"
            ></Image>
            <TouchableOpacity
              style={{
                height: rh(3.5),
                width: rh(3.5),
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: rw(0.5),
                elevation: 1,
                position: 'absolute',
                bottom: rh(0.1),
                right: rw(-1),
              }}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('SetStory')}
            >
              <Text style={{ fontSize: rf(2) }}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 15 }}>
            <Text
              style={{ color: 'white', fontWeight: '800', fontSize: rf(1.8) }}
            >
              {user?.name || 'Unknown'}
            </Text>
            <View style={{ flexDirection: 'row', gap: 40 }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  {user?.postCount || '0'}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  Posts
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  {user?.followersCount || '0'}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  followers
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  {user?.followingCount || '0'}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: rf(1.8),
                  }}
                >
                  following
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: rw(5), marginVertical: rh(2) }}>
        <Text style={{ color: 'white' }}>{user?.bio}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: rw(5),
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh(5),
            backgroundColor: '#37474F',
            marginHorizontal: rw(5),
            borderRadius: 5,
            paddingVertical: rh(1),
            width: rw(40),
          }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={{ color: 'white', fontSize: rf(2) }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh(5),
            backgroundColor: '#37474F',
            marginHorizontal: rw(5),
            borderRadius: 5,
            padding: 5,
            width: rw(40),
          }}
          activeOpacity={0.9}
          onPress={() => handleLogOut()}
        >
          <Text style={{ color: 'white', fontSize: rf(2) }}>logout</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: rh(50),
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <View>
          <Image
            source={require('../../assets/images/splash1.png')}
            style={{ height: rh(30), width: rw(50) }}
          ></Image>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: rf(3) }}>
            Create your first post
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: '800',
              textAlign: 'center',
              fontSize: rf(1.8),
            }}
          >
            Give this spave some love
          </Text>
        </View>

        {/* create buttonn */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePostStep1')}
          style={{ backgroundColor: '#1976D2', borderRadius: 10 }}
        >
          <Text
            style={{
              color: 'white',
              padding: 15,
              fontWeight: '500',
              fontSize: rf(1.8),
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={{
          backgroundColor: '#1976D2',
          borderRadius: 10,
          marginHorizontal: rw(10),
        }}
        onPress={() => handleLogOut()}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            padding: 10,
            fontSize: rf(2),
          }}
        >
          logout
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
