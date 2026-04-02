import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Home = () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8];
  const Post = [1, 2, 3, 4, 5, 6];
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{}}>
        <FlatList
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10, marginHorizontal: 10 }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity
                style={{
                  height: 70,
                  width: 70,
                  borderWidth: 1,
                  borderColor: '#FF80AB',
                  borderRadius: 50,

                  backgroundColor: '#263238',
                }}
              ></TouchableOpacity>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Dipendra
              </Text>
            </View>
          )}
        ></FlatList>
      </View>

      <View>
        <FlatList
          data={Post}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: 'grey',
                    borderRadius: 50,
                  }}
                ></View>

                <TouchableOpacity>
                  <FontAwesome5
                    name="ellipsis-v"
                    size={15}
                    color="white"
                    iconStyle="solid"
                  />
                </TouchableOpacity>
              </View>

              {/* image */}
              <View style={{ height: 400, backgroundColor: '#37474F' }}></View>

              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text style={{ color: 'white', fontWeight: '500' }}>
                      {25}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="comment" size={25} color="white" />
                    <Text style={{ color: 'white', fontWeight: '500' }}>
                      {25}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text style={{ color: 'white', fontWeight: '500' }}>
                      {25}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <FontAwesome5 name="heart" size={25} color="white" />
                    <Text style={{ color: 'white', fontWeight: '500' }}>
                      {25}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity>
                    <FontAwesome5 name="bookmark" size={25} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
