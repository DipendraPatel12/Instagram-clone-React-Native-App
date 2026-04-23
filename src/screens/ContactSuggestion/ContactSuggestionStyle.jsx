import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';
export default styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: 'black',
    gap: 20,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: rw(5),
    paddingHorizontal: rw(5),
    borderRadius: 10,
    gap: 20,
    elevation: 5,
  },
  toTextStyle: {
    color: '#B0BEC5',
    fontWeight: '800',
    fontSize: rf(2),
  },
  inputTextStyle: {
    fontWeight: '800',
    fontSize: rf(1.8),
    width: rw(75),
    color: 'white',
  },
  innerContainer: {
    marginHorizontal: rw(5),
    gap: 30,
  },
  suggestedTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: rf(2),
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: rh(2),
    gap: 20,
  },
  profileImageContainer: {
    height: rh(7),
    width: rh(7),
    backgroundColor: '#263238',
    borderRadius: 50,
  },
  profileImageStyle: {
    height: rh(7),
    width: rh(7),
    borderRadius: 50,
  },
  itemDescContainer: {
    justifyContent: 'center',
  },
  nameTextStyle: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(1.8),
  },
  usernameTextStyle: {
    color: 'grey',
    fontWeight: '500',
    fontSize: rf(2),
  },
});
