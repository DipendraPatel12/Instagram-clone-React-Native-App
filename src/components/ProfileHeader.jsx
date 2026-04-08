import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const ProfileHeader = ({ username }) => {
  return (
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
        <Text style={{ color: 'white', fontWeight: '500' }}>{username}</Text>
        <Text style={{ color: 'grey', fontWeight: '500' }}>dipendra@123</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
