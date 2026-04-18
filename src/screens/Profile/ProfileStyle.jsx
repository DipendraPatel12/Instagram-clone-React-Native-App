import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileAndUserDetailContainer: {
    marginHorizontal: rw(5),
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  profileImageContainer: {
    height: rh(10),
    width: rh(10),
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'relative',
  },
  profileImageStyle: {
    height: rh(10),
    width: rh(10),
    borderRadius: 50,
  },
  storySetterContainer: {
    height: rh(3.5),
    width: rh(3.5),
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: rw(0.5),
    elevation: 1,
    position: 'absolute',
    bottom: rh(0.1),
    right: rw(-1),
  },
  plusTextStyle: {
    fontSize: rf(2),
  },
  usernameTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(1.8),
  },
  countsContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  countTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(1.8),
  },
  userBioContainer: {
    marginHorizontal: rw(5),
    marginVertical: rh(2),
  },
  userBioTextStyle: {
    color: 'white',
    fontSize: rf(1.8),
  },
  editAndlogoutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: rw(5),
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(5),
    backgroundColor: '#37474F',
    marginHorizontal: rw(5),
    borderRadius: 5,
    paddingVertical: rh(1),
    width: rw(40),
  },
  btnTextStyle: {
    color: 'white',
    fontSize: rf(2),
  },
  createPostContainer: {
    height: rh(50),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  splashImageStyle: {
    height: rh(30),
    width: rw(50),
  },
  createPostTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(3),
  },
  createPostText2Style: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: rf(1.8),
  },
  createBtnTextStyle: {
    color: 'white',
    padding: 15,
    fontWeight: '500',
    fontSize: rf(1.8),
  },
});
