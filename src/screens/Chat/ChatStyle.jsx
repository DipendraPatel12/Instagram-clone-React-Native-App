import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  itemContainer: {
    marginBottom: rh(3),
    paddingTop: rh(1),
    marginHorizontal: rw(5),
  },
  profileImageStyle: {
    height: rh(5),
    width: rh(5),
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  messageTextStyle: {
    color: 'white',
    padding: 10,
    borderRadius: 10,
    maxWidth: rw(70),
    flexWrap: 'wrap',
  },
  pressableBoxContainer: {
    height: rh(15),
    width: rw(30),
    borderRadius: 25,
    backgroundColor: '#212121',
    position: 'absolute',
    right: rw(5),
    alignSelf: 'center',
    elevation: 5,
    padding: 20,
    gap: 20,
    justifyContent: 'center',
  },
  pressableBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: rf(2),
  },
  inputBoxContainer: {
    backgroundColor: 'black',
    paddingBottom: rh(1),
  },
  inputBoxInnerContainer: {
    backgroundColor: '#424242',
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: rw(4),
    paddingVertical: rh(0.5),
    alignItems: 'center',
    paddingHorizontal: rw(2),
    gap: rw(1),
  },
  cameraView: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 50,
  },
  inputTextStyle: {
    flex: 1,
    color: 'white',
    fontSize: rf(1.8),
  },
  sendBtnContainer: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 10,
  },
  sendTextStyle: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(1.8),
  },
});
