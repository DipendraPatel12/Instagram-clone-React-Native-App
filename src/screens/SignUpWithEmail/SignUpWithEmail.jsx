import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import styles from './SignUpWithEmailStyle';
const SignUpWithEmail = ({ navigation, route }) => {
  const username = route?.params?.username;
  const [email, setEmail] = useState('');
  console.warn(`email --> ${email}  username --- ${username}`);

  const goTo = () => {
    if (!email || email === '') {
      Alert.alert('Email is required!');
      return;
    }
    navigation.navigate('CreatePassword', {
      email: email.trim(),
      username: username,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerConatiner}>
        <Text style={styles.heading}>What's Your email address?</Text>

        <Text style={styles.secondHeading}>
          Enter the email address at which you can be contacted. No one will see
          this on your profile.
        </Text>

        <TextInput
          placeholder="Email address"
          placeholderTextColor="grey"
          style={styles.textInputStyle}
          value={email}
          onChangeText={text => setEmail(text)}
        ></TextInput>

        <View style={{ gap: 20, marginTop: 15 }}>
          <TouchableOpacity
            style={styles.nextText}
            activeOpacity={0.7}
            onPress={goTo}
          >
            <Text style={styles.nextTextStyle}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUpWithPhone')}
          >
            <Text style={styles.nextTextStyle}>Sign up mobile number</Text>
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

export default SignUpWithEmail;
