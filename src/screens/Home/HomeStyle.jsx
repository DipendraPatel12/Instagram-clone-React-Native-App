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
  pressableBoxContainer: {
    height: rh(10),
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
});
