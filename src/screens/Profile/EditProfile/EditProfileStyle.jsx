import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileUpdatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  profileImageStyle: {
    width: rh(10),
    height: rh(10),
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  editPictureTextStyle: {
    color: '#1976D2',
    fontSize: rf(1.8),
    fontWeight: '500',
  },

  formContainer: {
    gap: 20,
    marginVertical: rh(5),
  },

  inputBoxContainer: {
    backgroundColor: '#212121',
    marginHorizontal: rw(5),
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  inputPlaceHolderTextStyle: {
    color: 'grey',
    fontSize: rf(1.8),
  },
  fieldTextStyle: {
    color: 'white',
    fontSize: rf(1.8),
  },
  updateBtnContainer: {
    backgroundColor: '#1976D2',
    marginHorizontal: rw(5),
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  updateBtnTextStyle: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: rf(1.8),
    padding: 13,
  },
});
