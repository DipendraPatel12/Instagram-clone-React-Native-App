import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import firestore from '@react-native-firebase/firestore';

const SearchProfile = ({ setResults }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const res = await firestore()
        .collection('users')
        .where('username', '==', searchText)
        .get();

      // console.log(res);
      const users = res.docs.map(doc => ({
        ...doc._data,
      }));

      // console.log('Users:', users);
      setResults(users);
    } catch (error) {
      console.error('Error while searching..', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={15} color="white" iconStyle="solid" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="gray"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {searchText !== '' && (
        <TouchableOpacity onPress={() => setSearchText('')}>
          <FontAwesome5
            name="times"
            size={20}
            color="white"
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#263238',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    paddingHorizontal: 15,
    color: 'white',
    width: '90%',
  },
});
