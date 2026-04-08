import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';
import SearchProfile from '../../components/SearchProfile';
import { FlashList } from '@shopify/flash-list';
import EmptyData from '../../components/EmptyData';

const Search = ({ navigation }) => {
  const [results, setResults] = useState([]);
  console.log('result in search PAge ', results);
  const data = [1, 2, 3, 4, 5];
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SearchProfile setResults={setResults}></SearchProfile>
      <FlashList
        data={results}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={{
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.6}
            underlayColor="#263238"
            // onPress={() => alert('Pressed!')}

            onPress={() =>
              navigation.navigate('SearchedProfile', {
                username: item?.username,
                id: item?.id,
              })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'grey',
                  borderRadius: 50,
                }}
              ></Image>
              <View>
                <Text style={{ color: 'white', fontWeight: '500' }}>
                  John Doe
                </Text>
                <Text style={{ color: 'grey' }}>
                  followed by martin,40+ others
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        contentContainerStyle={{ paddingVertical: 15 }}
      ></FlashList>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
