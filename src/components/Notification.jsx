import { StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Notification = () => {

  return (
    <>
      <TouchableOpacity>
        <FontAwesome5 name="heart" size={20} color="white" />
      </TouchableOpacity>
    </>
  );

};

export default Notification;

const styles = StyleSheet.create({});






