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
import { rf, rh, rw } from '../../helper/responsive';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/slices/authSlice';
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
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '400',
            fontSize: rf(5),
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
              borderWidth: 0.4,
              borderColor: 'grey',
              marginHorizontal: rw(5),
              color: 'white',
              borderRadius: 10,
              paddingVertical: rh(2.5),
              paddingHorizontal: rw(5),
              elevation: 2,
              fontSize: rf(1.8),
            }}
            value={email}
            onChangeText={text => setEmail(text)}
          ></TextInput>

          <TextInput
            placeholderTextColor="grey"
            placeholder="password"
            style={{
              backgroundColor: '#212121',
              borderWidth: 0.4,
              borderColor: 'grey',
              marginHorizontal: rw(5),
              color: 'white',
              borderRadius: 10,
              paddingVertical: rh(2.5),
              paddingHorizontal: rw(5),
              fontSize: rf(1.8),
              elevation: 10,
            }}
            value={password}
            onChangeText={text => setPassword(text)}
          ></TextInput>

          <TouchableOpacity style={{ marginBottom: rh(4) }}>
            <Text
              style={{
                color: '#90CAF9',
                textAlign: 'right',
                marginHorizontal: rw(5),
                fontWeight: '500',
                fontSize: rf(1.8),
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
            marginHorizontal: rw(5),
            borderRadius: 20,
          }}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              color: 'white',
              fontSize: rf(1.8),
            }}
          >
            {loading ? `Logging...` : 'log in'}
          </Text>
        </TouchableOpacity>

        {isError && (
          <View>
            <Text
              style={{ textAlign: 'center', color: 'red', fontSize: rf(1.5) }}
            >
              {error}
            </Text>
          </View>
        )}
        <View style={{ gap: 35 }}>
          <TouchableOpacity>
            <Text
              style={{
                color: '#90CAF9',
                textAlign: 'center',
                marginHorizontal: rw(5),
                fontWeight: '500',
                fontSize: rf(1.8),
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
                width: rw(35),
                marginHorizontal: rw(5),
              }}
            ></View>
            <Text
              style={{
                color: '#90A4AE',
                textAlign: 'center',
                fontSize: rf(1.9),
              }}
            >
              OR
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: 'white',
                width: rw(35),
                marginHorizontal: rw(5),
              }}
            ></View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: '#90A4AE', fontSize: rf(1.8) }}>
              Don't have an account? {''}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SetUsername')}
            >
              <Text
                style={{
                  color: '#90CAF9',
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: rf(1.8),
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
