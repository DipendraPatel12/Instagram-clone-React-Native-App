import { StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('ContactSuggestion')}
      >
        <FontAwesome5 name="heart" size={20} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});
