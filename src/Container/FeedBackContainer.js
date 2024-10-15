import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import C_Title_With_Desc from '../Components/C_Title_With_Desc';
import CustomerFeed from '../Components/AppComponent/CustomerFeed';

const FeedBackContainer = () => {
  return (
    <View style={styles.container}>
      <C_Title_With_Desc
        text_title="What Our Customers Are Saying"
      />
      <FlatList
        data={[1, 1, 1, 1,1,1,1]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={() => {
          return <CustomerFeed />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FeedBackContainer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
