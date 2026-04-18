import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import styles from './SetUsernameStyle';

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
