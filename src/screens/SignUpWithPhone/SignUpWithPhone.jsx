import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

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
  },
  notificationText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
  },
  learnMoreText: {
    color: '#90CAF9',
    fontWeight: '800',
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
