import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'space-between',
  },
  innerConatiner: {
    marginHorizontal: rw(5),
    gap: 10,
  },
  heading: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(3.5),
  },
  secondHeading: {
    color: 'white',
    fontSize: rf(1.8),
    fontWeight: '500',
    marginBottom: rh(1.5),
  },
  textInputStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    color: 'white',
    fontSize: rf(1.8),
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
    fontSize: rf(2),
  },
  signupBtn: {
    backgroundColor: '#37474F',
    padding: 15,
    borderRadius: 25,
  },
  alreadyAccountText: {
    color: '#42A5F5',
    textAlign: 'center',
    marginBottom: rh(4),
  },
});
