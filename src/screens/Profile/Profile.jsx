import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

const Profile = ({ navigation }) => {
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
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', gap: 30 }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 50,
              position: 'relative',
            }}
          >
            <Image
              source={require('../../assets/images/user1.jpg')}
              style={{ height: 80, width: 80, borderRadius: 50 }}
              resizeMode="contain"
            ></Image>
            <TouchableOpacity
              style={{
                height: 25,
                width: 25,
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                elevation: 1,
                position: 'absolute',
                bottom: 1,
                right: 2,
              }}
              activeOpacity={0.9}
            >
              <Text style={{ fontSize: 15 }}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 15 }}>
            <Text style={{ color: 'white', fontWeight: '800' }}>
              Dipendra Patel
            </Text>
            <View style={{ flexDirection: 'row', gap: 40 }}>
              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>0</Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>Posts</Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>0</Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  followers
                </Text>
              </View>

              <View>
                <Text style={{ color: 'white', fontWeight: '800' }}>0</Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>
                  following
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 25 }}>
            Create your first post
          </Text>
          <Text
            style={{ color: 'white', fontWeight: '800', textAlign: 'center' }}
          >
            Give this spave some love{' '}
          </Text>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#1976D2', borderRadius: 10 }}
        >
          <Text style={{ color: 'white', padding: 15, fontWeight: '500' }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#1976D2',
          borderRadius: 10,
          marginHorizontal: 50,
        }}
        onPress={() => handleLogOut()}
      >
        <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>
          logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
