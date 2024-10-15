import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';

import Category from '../../Components/AppComponent/Categories';
import Colors from '../../Themes/Colors';
import { useRoute } from '@react-navigation/native';

export default function Categories() {
  const route = useRoute();
  const { categoryId } = route?.params;
  // console.log("categoryId=============>",categoryId)
  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
              <Category  categoryId={categoryId}/>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: Colors.bgColor,
  },
});
