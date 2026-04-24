import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import EmptyData from '../../components/EmptyData';
import { rh } from '../../helper/responsive';

const Reels = () => {
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <FlashList
        data={[]}
        numColumns={3}
        renderItem={({ item}) => <Text></Text>}
        ListEmptyComponent={<EmptyData title={'No Reels'}></EmptyData>}
        contentContainerStyle={{ marginVertical: rh(20) }}
      ></FlashList>
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({});
