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
import React, { useEffect } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5/static';
import { rf, rh, rw } from '../../helper/responsive';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
const Message = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);
  useEffect(() => {
    getRecentsChats();
  }, []);
  const getRecentsChats = async () => {
    try {
      const data = await firestore().collection('chats').get();

      const recentChatIds = data.docs.map(doc => {
        return {
          docId: doc.id,
          ...doc.data(),
        };
      });

      let updatedIds = [];
      recentChatIds.forEach(doc => {
        const splitedId = doc.docId.split('-');
        splitedId.forEach(id => {
          if (id !== user.id) {
            updatedIds.push(id);
          }
        });
      });
      console.log('recents chats', data, recentChatIds, updatedIds);
    } catch (error) {
      console.error(error);
    }
  };

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
              marginBottom: rh(2),
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
              style={{
                flexDirection: 'row',
                gap: 20,
                marginHorizontal: rw(5),
              }}
            >
              <View
                style={{
                  height: rh(6),
                  width: rh(6),
                  backgroundColor: '#263238',
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../assets/images/user1.jpg')}
                  style={{ height: rh(6), width: rh(6), borderRadius: 50 }}
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
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    fontSize: rf(1.8),
                  }}
                >
                  4+ new messages
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <View style={{ gap: 10, marginBottom: rh(3) }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#263238',
                marginHorizontal: rw(5),
                paddingHorizontal: rw(5),
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
                style={{ fontWeight: '800', fontSize: rf(2) }}
              ></TextInput>
            </View>

            <Text
              style={{
                color: 'white',
                fontWeight: '800',
                marginHorizontal: rw(5),
                fontSize: rf(1.9),
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
