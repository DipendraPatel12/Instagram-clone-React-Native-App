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
const ContactSuggestion = () => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <View style={{ flex: 1, backgroundColor: 'black', gap: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          paddingHorizontal: 20,
          borderRadius: 10,
          gap: 20,
          elevation: 5,
        }}
      >
        <Text style={{ color: '#B0BEC5', fontWeight: '800', fontSize: 15 }}>
          To :
        </Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#B0BEC5'}
          style={{ fontWeight: '800' }}
        ></TextInput>
      </View>

      <View style={{ marginHorizontal: 20, gap: 30 }}>
        <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>
          Suggested
        </Text>

        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                gap: 20,
              }}
            >
              {/* profile */}

              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: '#263238',
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../assets/images/user1.jpg')}
                  style={{ height: 60, width: 60, borderRadius: 50 }}
                ></Image>
              </View>

              {/* name and last message */}

              <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '500' }}>
                  dipendra
                </Text>
                <Text style={{ color: 'grey', fontWeight: '500' }}>
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
