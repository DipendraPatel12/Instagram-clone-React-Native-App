import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
  },
  previewImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: rh(70),
  },
  previewImageStyle: {
    width: rw(100),
    height: rh(50),
  },
  contentSetter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(3),
    gap: 20,
  },
  textSetterBox: {
    height: rh(6),
    width: rw(20),
    borderRadius: 10,
    backgroundColor: '#263238',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSetterStyle: {
    color: 'white',
    fontSize: rf(2),
  },
  textSetter2Style: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(1.5),
  },
  postDetailContainer: {
    backgroundColor: '#263238',
    width: rw(90),
    borderRadius: 10,
    flexDirection: 'row',
  },
  showPostDescContainer: {
    width: rw(80),
  },
  postDetailTextStyle: {
    color: 'white',
    padding: 10,
    fontSize: rf(1.8),
  },
  removeContentStyle: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  postingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  postBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    width: rw(20),
    height: rh(5),
    borderRadius: 10,
    marginRight: rh(5),
    marginBottom: rh(5),
  },
  postTextStyle: {
    color: 'white',
    fontWeight: '800',
  },
  modalContainer: {
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnContainer: {
    position: 'absolute',
    top: rh(1),
    right: rw(8),
  },
  doneBtnTextStyle: {
    color: 'white',
    fontWeight: '600',
    fontSize: rf(2.5),
  },
  inputTextStyle: {
    color: 'white',
    backgroundColor: 'black',
    marginHorizontal: rw(3),
    borderRadius: 10,
  },
});
