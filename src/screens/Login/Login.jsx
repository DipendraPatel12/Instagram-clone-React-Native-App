import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/slices/authSlice';
import styles from './LoginStyle';
const Login = ({ navigation }) => {
  const dipatch = useDispatch();
  const [email, setEmail] = useState('dipendrapatel926@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  console.warn(`email ---> ${email} ,  password ----> ${password}`);

  useEffect(() => {
    setTimeout(() => {
      setIsError();
      setError('');
    }, 3000);
  }, [isError]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('All field required!');
      return;
    }
    setIsError(false);
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(getAuth(), email, password);
      console.log(user.user);
      setLoading(false);
      if (user.user._user.emailVerified) {
        // navigation.navigate('MainTabs');
        dipatch(getUserProfile(user.user._user.uid));
        navigation.dispatch(StackActions.replace('MainTabs'));
      } else {
        Alert.alert('Verify Email First!');
      }
      // console.warn('data', data);
    } catch (error) {
      console.warn(error);
      setError('Invalid Credentials!');
      setIsError(true);
      setLoading(false);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 25 }}>
        <Text style={styles.instagramHeader}>Instagram</Text>

        <View style={{ gap: 10 }}>
          <TextInput
            placeholderTextColor="grey"
            placeholder="email"
            style={styles.textInputStyle}
            value={email}
            onChangeText={text => setEmail(text)}
          ></TextInput>

          <TextInput
            placeholderTextColor="grey"
            placeholder="password"
            style={styles.textInputStyle}
            value={password}
            onChangeText={text => setPassword(text)}
          ></TextInput>

          <TouchableOpacity style={styles.forgetPassContainer}>
            <Text style={styles.forgetPassText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 35 }}>
        <TouchableOpacity
          style={styles.loginContainer}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <Text style={styles.loginText}>
            {loading ? `Logging...` : 'log in'}
          </Text>
        </TouchableOpacity>

        {isError && (
          <View>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={{ gap: 35 }}>
          <TouchableOpacity>
            <Text style={styles.loginFaceBookText}>Log in with Facebook</Text>
          </TouchableOpacity>

          <View style={styles.bottomLineAndOrContainer}>
            <View style={styles.bottomLine}></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.bottomLine}></View>
          </View>

          <View style={styles.accountAndSignupContainer}>
            <Text style={styles.accountText}>Don't have an account? {''}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SetUsername')}
            >
              <Text style={styles.signupText}>Sign up.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
