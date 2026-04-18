import { StyleSheet } from 'react-native';
import { rf, rh, rw } from '../../helper/responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
  instagramHeader: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: rf(5),
  },
  textInputStyle: {
    backgroundColor: '#212121',
    borderWidth: 0.4,
    borderColor: 'grey',
    marginHorizontal: rw(5),
    color: 'white',
    borderRadius: 10,
    paddingVertical: rh(2.5),
    paddingHorizontal: rw(5),
    elevation: 10,
    fontSize: rf(1.8),
  },
  forgetPassText: {
    color: '#90CAF9',
    textAlign: 'right',
    marginHorizontal: rw(5),
    fontWeight: '500',
    fontSize: rf(1.8),
  },
  forgetPassContainer: {
    marginBottom: rh(4),
  },
  loginText: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
    fontSize: rf(1.8),
  },
  errorText: { textAlign: 'center', color: 'red', fontSize: rf(1.5) },
  loginFaceBookText: {
    color: '#90CAF9',
    textAlign: 'center',
    marginHorizontal: rw(5),
    fontWeight: '500',
    fontSize: rf(1.8),
  },
  bottomLine: {
    borderBottomWidth: 0.5,
    borderColor: 'white',
    width: rw(35),
    marginHorizontal: rw(5),
  },
  orText: {
    color: '#90A4AE',
    textAlign: 'center',
    fontSize: rf(1.9),
  },
  signupText: {
    color: '#90CAF9',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: rf(1.8),
  },
  accountText: {
    color: '#90A4AE',
    fontSize: rf(1.8),
  },
  bottomLineAndOrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountAndSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: '#1565C0',
    marginHorizontal: rw(5),
    borderRadius: 20,
  },
});
