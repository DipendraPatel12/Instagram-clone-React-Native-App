import { StyleSheet } from 'react-native';
import { rh, rw, rf } from '../../../helper/responsive';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },
  imagePreviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageStyle: {
    height: rh(40),
    width: rw(80),
  },
  itemContainer: {
    position: 'relative',
  },
  itemImageStyle: {
    width: rh(16),
    height: rw(30),
  },
  itemTextStyle: {
    color: 'white',
    position: 'absolute',
    top: rh(6),
    left: rw(15),
  },
});
