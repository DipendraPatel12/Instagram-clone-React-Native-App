import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  profileAndCountContainer: {
    marginHorizontal: rw(5),
    marginTop: rh(1),
  },
  profileCountInnerContainer: {
    flexDirection: 'row',
    gap: rw(6),
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
  usernameAndCountContainer: {
    gap: rh(2),
  },
  usernameTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(1.8),
  },
  countContainer: {
    flexDirection: 'row',
    gap: rw(10),
  },
  countContainerTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(1.7),
  },
  bioContainer: {
    marginHorizontal: rw(5),
    marginTop: rh(3),
  },
  bioTextStyle: {
    color: 'white',
    fontWeight: '700',
    fontSize: rf(1.7),
  },
  accountPrivateContainer: {
    flexDirection: 'row',
    marginHorizontal: rw(5),
    paddingVertical: rh(1),
    gap: 10,
  },
  lockContainer: {
    height: rh(8),
    width: rh(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37474F',
    borderRadius: 50,
  },
  accountInnerContainer: {
    justifyContent: 'center',
  },
  accountText1Style: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(1.8),
  },
  accountText2Style: {
    color: 'white',
    fontWeight: '400',
    maxWidth: rw(70),
    fontSize: rf(1.8),
  },
});
