import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    gap: 20,
  },
  itemContainer: {
    marginBottom: rh(2),
  },
  profileAndUsernameContainer: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: rw(5),
  },
  profileImageContainer: {
    height: rh(6),
    width: rh(6),
    backgroundColor: '#263238',
    borderRadius: 50,
  },
  imageStyle: {
    height: rh(6),
    width: rh(6),
    borderRadius: 50,
  },
  usernameTextStyle: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(1.8),
  },

  searchBarContainer: {
    gap: 10,
    marginBottom: rh(3),
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#263238',
    marginHorizontal: rw(5),
    paddingHorizontal: rw(5),
    borderRadius: 10,
    gap: 10,
    elevation: 5,
  },
  searchBarInpuyStyle: {
    fontWeight: '800',
    fontSize: rf(2),
    color: 'white',
    width: rw(80),
  },
  messagesTextStyle: {
    color: 'white',
    fontWeight: '800',
    marginHorizontal: rw(5),
    fontSize: rf(1.9),
  },
});
