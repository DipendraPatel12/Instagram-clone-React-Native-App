import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import Camera from '../../components/Camera';

const Chat = () => {
  const messages = [
    'hii',
    'hello',
    'How are you ?',
    'i am good',
    'what are doing ?',
    'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf',
    'what do say ?',
    'ok',
    'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
    'How are you ?',
    'i am good',
    'what are doing ?',
    'lets play cricket sdf sf sdfdsf df sf df d sdf sdf sdf sdf sfsdfsd fsd d',
    'what do say ?',
    'ok',
    'lets go sfsd sdf sfsdf dfgsd fsdf sdf sfsd f',
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: index % 2 == 0 ? 'flex-start' : 'flex-end',
                  gap: 10,
                }}
              >
                {index % 2 == 0 && (
                  <Image
                    source={require('../../assets/images/user1.jpg')}
                    style={{ height: 30, width: 30, borderRadius: 50 }}
                  ></Image>
                )}
                <View
                  style={{
                    backgroundColor: index % 2 == 0 ? '#424242' : '#6A1B9A',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    elevation: 5,
                    width: '50%',
                  }}
                >
                  <Text style={{ color: 'white' }}>{item}</Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'black',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: '#424242',
            borderRadius: 10,
            flexDirection: 'row',
            marginHorizontal: 10,
            paddingVertical: 5,
            alignItems: 'center',
            paddingHorizontal: 10,
            gap: 5,
          }}
        >
          <View
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 50,
              alignItems: 'center',
            }}
          >
            <Camera></Camera>
          </View>
          <View style={{ width: '70%' }}>
            <TextInput
              placeholder="Message..."
              placeholderTextColor="grey"
              style={{ width: '80%' }}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#6A1B9A',
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '500' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
