import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import styles from './SignUpWithPhoneStyle';

const SignUpWithPhone = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerConatiner}>
        <Text style={styles.heading}>What's Your Mobile Number?</Text>

        <Text style={styles.secondHeading}>
          Enter the mobile number on which you can be contacted. No one will see
          this on your profile.
        </Text>

        <TextInput
          placeholder="Mobile number"
          placeholderTextColor="grey"
          style={styles.textInputStyle}
        ></TextInput>

        <View>
          <Text style={styles.notificationText}>
            You may recieve Whastapp and SMS notification from us
          </Text>
          <TouchableOpacity>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 20, marginTop: 15 }}>
          <TouchableOpacity
            style={styles.nextText}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CreatePassword')}
          >
            <Text style={styles.nextTextStyle}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUpWithEmail')}
          >
            <Text style={styles.nextTextStyle}>Sign up with email address</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            style={styles.alreadyAccountText}
            onPress={() => navigation.navigate('Login')}
          >
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpWithPhone;
