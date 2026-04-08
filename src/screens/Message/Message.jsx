import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5/static';

const Message = ({ navigation }) => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <View style={{ flex: 1, backgroundColor: 'black', gap: 20 }}>
      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableHighlight
            style={{
              marginBottom: 20,
            }}
            activeOpacity={0.6}
            underlayColor="#263238"
            // onPress={() => alert('Pressed!')}

            onPress={() =>
              navigation.navigate('Chat', { username: 'dipendra' })
            }
          >
            {/* profile */}
            <View
              style={{ flexDirection: 'row', gap: 20, marginHorizontal: 20 }}
            >
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
                <Text style={{ color: 'white', fontWeight: '500' }}>
                  4+ new messages
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <View style={{ gap: 10, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#263238',
                marginHorizontal: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                gap: 10,
                elevation: 5,
              }}
            >
              <FontAwesome5
                name="search"
                color="white"
                iconStyle="solid"
              ></FontAwesome5>
              <TextInput
                placeholder="Search"
                style={{ fontWeight: '800' }}
              ></TextInput>
            </View>

            <Text
              style={{
                color: 'white',
                fontWeight: '800',
                marginHorizontal: 20,
              }}
            >
              Messages
            </Text>
          </View>
        }
      ></FlatList>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
