import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Login = ({ navigation }) => {
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
            placeholder="username"
            style={{
              backgroundColor: '#212121',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginHorizontal: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          ></TextInput>

          <TextInput
            placeholderTextColor="grey"
            placeholder="password"
            style={{
              backgroundColor: '#212121',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginHorizontal: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
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
            backgroundColor: '#2196F3',
            marginHorizontal: 20,
            borderRadius: 5,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={{ textAlign: 'center', padding: 10, color: '#90A4AE' }}>
            Log in
          </Text>
        </TouchableOpacity>

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
              onPress={() => navigation.navigate('SignUpWithPhone')}
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
