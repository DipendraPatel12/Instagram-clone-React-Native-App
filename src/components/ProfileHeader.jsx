import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { rf, rh } from '../helper/responsive';
import { useNavigation } from '@react-navigation/native';

const ProfileHeader = ({ id, name, username, avatar }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
      }}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SearchedProfile', { id, username })}
    >
      <View
        style={{
          height: rh(5),
          width: rh(5),
          backgroundColor: 'grey',
          borderRadius: 50,
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{ height: rh(5), width: rh(5), borderRadius: 50 }}
          resizeMode="cover"
        ></Image>
      </View>

      <View>
        <Text style={{ color: 'white', fontWeight: '500', fontSize: rf(1.8) }}>
          {name}
        </Text>
        <Text style={{ color: 'grey', fontWeight: '500', fontSize: rf(1.8) }}>
          {username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};    

export default ProfileHeader;

const styles = StyleSheet.create({});
