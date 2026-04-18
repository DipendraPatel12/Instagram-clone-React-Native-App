import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  itemContainer: {
    marginBottom: rh(2),
    marginHorizontal: rw(5),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rw(5),
  },
  imageStyle: {
    height: rh(7),
    width: rh(7),
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  usernameText: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(1.8),
  },
  contentText: {
    color: 'grey',
    fontSize: rf(1.6),
  },
});
