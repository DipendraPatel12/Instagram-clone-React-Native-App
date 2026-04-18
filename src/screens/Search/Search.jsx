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
import { rh, rw, rf } from '../../helper/responsive';
import styles from './SearchStyle';
const Search = ({ navigation }) => {
  const [results, setResults] = useState([]);
  // console.log('result in search PAge ', results);
  // const data = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      <SearchProfile setResults={setResults}></SearchProfile>
      <FlashList
        data={results}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.itemContainer}
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
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: item.avtar }}
                style={styles.imageStyle}
                resizeMode="cover"
              ></Image>
              <View>
                <Text style={styles.usernameText}>{item.username || ''}</Text>
                <Text style={styles.contentText}>
                  followed by martin,40+ others
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: rh(20),
            }}
          >
            <Text style={{ color: 'grey' }}></Text>
          </View>
        }
      ></FlashList>
    </View>
  );
};

export default Search;
