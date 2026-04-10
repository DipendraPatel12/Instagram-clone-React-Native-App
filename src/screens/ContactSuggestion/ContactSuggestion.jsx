import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5/static';
import { rf, rh, rw } from '../../helper/responsive';
const ContactSuggestion = () => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <View style={{ flex: 1, backgroundColor: 'black', gap: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: rw(5),
          paddingHorizontal: rw(5),
          borderRadius: 10,
          gap: 20,
          elevation: 5,
        }}
      >
        <Text style={{ color: '#B0BEC5', fontWeight: '800', fontSize: rf(2) }}>
          To :
        </Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#B0BEC5'}
          style={{ fontWeight: '800', fontSize: rf(1.8), width: rw(73) }}
        ></TextInput>
      </View>

      <View style={{ marginHorizontal: rw(5), gap: 30 }}>
        <Text style={{ color: 'white', fontWeight: '800', fontSize: rf(2) }}>
          Suggested
        </Text>

        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: rh(2),
                gap: 20,
              }}
            >
              {/* profile */}

              <View
                style={{
                  height: rh(7),
                  width: rh(7),
                  backgroundColor: '#263238',
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../assets/images/user1.jpg')}
                  style={{ height: rh(7), width: rh(7), borderRadius: 50 }}
                ></Image>
              </View>

              {/* name and last message */}

              <View style={{ justifyContent: 'center' }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    fontSize: rf(1.8),
                  }}
                >
                  dipendra
                </Text>
                <Text
                  style={{ color: 'grey', fontWeight: '500', fontSize: rf(2) }}
                >
                  dipendra_patel@102
                </Text>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default ContactSuggestion;

const styles = StyleSheet.create({});
