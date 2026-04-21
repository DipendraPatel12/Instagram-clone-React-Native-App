import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  itemContainer: { marginBottom: rh(3), gap: rh(2) },
  itemProfileAndActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: rw(4),
    alignItems: 'center',
  },
  profileAndNameContainer: {
    flexDirection: 'row',
    gap: rw(4),
    alignItems: 'center',
  },
  imageContainer: {
    height: rh(6),
    width: rh(6),
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  profileImageStyle: {
    height: rh(6),
    width: rh(6),
    borderRadius: 50,
  },
  usernameStyle: { color: 'white', fontSize: rf(1.8) },
  postImageContainer: {
    height: rh(50),
    backgroundColor: '#37474F',
  },
  postImageStyle: {
    height: rh(50),
    width: rw(100),
  },

  postActionContainer: {
    marginHorizontal: rw(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: rh(1),
  },
  postActionLeftContainer: {
    flexDirection: 'row',
    gap: rw(5),
  },
  actionIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rw(1.5),
  },
  actionTextStyle: {
    color: 'white',
    fontWeight: '500',
    fontSize: rf(2),
  },
  postDetailContainer: {
    marginHorizontal: rw(5),
  },
  postDescTextStyle: {
    color: 'white',
    fontSize: rf(1.8),
  },
  showMoreLessTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
    fontWeight: '500',
  },
});
