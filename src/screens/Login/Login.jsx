import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '400',
            fontSize: 35,
          }}
        >
          Instagram
        </Text>

        <View style={{ gap: 10 }}>
          <TextInput
            placeholderTextColor="grey"
            placeholder="email"
            style={{
              backgroundColor: '#212121',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginHorizontal: 20,
              color: 'white',
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
            value={email}
            onChangeText={text => setEmail(text)}
          ></TextInput>

          <TextInput
            placeholderTextColor="grey"
            placeholder="password"
            style={{
              backgroundColor: '#212121',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginHorizontal: 20,
              color: 'white',
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
            value={password}
            onChangeText={text => setPassword(text)}
          ></TextInput>

          <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: '#90CAF9',
                textAlign: 'right',
                marginHorizontal: 20,
                fontWeight: '500',
                fontSize: 13,
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 35 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1565C0',
            marginHorizontal: 20,
            borderRadius: 20,
          }}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <Text style={{ textAlign: 'center', padding: 15, color: 'white' }}>
            {loading ? `Logging...` : 'log in'}
          </Text>
        </TouchableOpacity>

        {isError && (
          <View>
            <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
          </View>
        )}
        <View style={{ gap: 35 }}>
          <TouchableOpacity>
            <Text
              style={{
                color: '#90CAF9',
                textAlign: 'center',
                marginHorizontal: 20,
                fontWeight: '500',
                fontSize: 13,
              }}
            >
              Log in with Facebook
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: 'white',
                width: '35%',
                marginHorizontal: 25,
              }}
            ></View>
            <Text style={{ color: '#90A4AE', textAlign: 'center' }}>OR</Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: 'white',
                width: '35%',
                marginHorizontal: 25,
              }}
            ></View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: '#90A4AE', fontSize: 13 }}>
              {' '}
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpWithEmail')}
            >
              <Text
                style={{
                  color: '#90CAF9',
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: 13,
                }}
              >
                Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
});
