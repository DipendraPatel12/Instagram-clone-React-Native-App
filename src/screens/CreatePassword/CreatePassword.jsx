import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const CreatePassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerConatiner}>
        <Text style={styles.heading}>Create a password</Text>

        <Text style={styles.secondHeading}>
          Create a password with at least six letters or numbers. It should be
          something that others can't guess.
        </Text>

        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          style={styles.textInputStyle}
        ></TextInput>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.notificationText}>Remember login info. </Text>
          <TouchableOpacity>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 20, marginTop: 15 }}>
          <TouchableOpacity style={styles.nextText} activeOpacity={0.7}>
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

export default CreatePassword;

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
    fontWeight: '600',
    fontSize: 13,
  },
  learnMoreText: {
    color: '#90CAF9',
    fontWeight: '600',
  },
  nextText: {
    backgroundColor: '#42A5F5',
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
