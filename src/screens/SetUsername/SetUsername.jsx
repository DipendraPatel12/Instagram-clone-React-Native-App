import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

const SetUsername = ({ navigation }) => {
  const [username, setUsername] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.innerConatiner}>
        <Text style={styles.heading}>Create a username</Text>

        <Text style={styles.secondHeading}>
          Enter the username people will call you by that name. this will appear
          on your profile.
        </Text>

        <TextInput
          placeholder="username"
          placeholderTextColor="grey"
          style={styles.textInputStyle}
          value={username}
          onChangeText={text => setUsername(text)}
        ></TextInput>

        <View style={{ gap: 20, marginTop: 15 }}>
          <TouchableOpacity
            style={styles.nextText}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('SignUpWithEmail', {
                username: username.trim(),
              })
            }
          >
            <Text style={styles.nextTextStyle}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.alreadyAccountText}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetUsername;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'space-between',
  },
  innerConatiner: {
    marginHorizontal: 25,
    gap: 10,
  },
  heading: {
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
  },
  secondHeading: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  textInputStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    color: 'white',
  },

  nextText: {
    backgroundColor: '#1565C0',
    padding: 15,
    borderRadius: 25,
  },
  nextTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  signupBtn: {
    backgroundColor: '#37474F',
    padding: 15,
    borderRadius: 25,
  },
  alreadyAccountText: {
    color: '#42A5F5',
    textAlign: 'center',
    marginBottom: 20,
  },
});
