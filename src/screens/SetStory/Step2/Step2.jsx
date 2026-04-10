import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rf, rh, rw } from '../../../helper/responsive';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Step2 = ({ route, navigation }) => {
  const { img, type } = route?.params || '';
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          marginHorizontal: rw(3),
          position: 'absolute',
          zIndex: 5,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#424242',
            width: rh(6),
            height: rh(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name="arrow-left"
            size={25}
            color="white"
            iconStyle="solid"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>

      {/* image */}
      <View>
        <Image
          source={{ uri: img }}
          style={{ width: rw(100), height: rh(80), borderRadius: 30 }}
        ></Image>
      </View>

      <View
        style={{
          marginBottom: rh(5),
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: rw(5),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#1E88E5',
            width: rh(6),
            height: rh(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          activeOpacity={0.8}
        >
          <FontAwesome5
            name="arrow-right"
            size={25}
            color="white"
            iconStyle="solid"
          ></FontAwesome5>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({});
