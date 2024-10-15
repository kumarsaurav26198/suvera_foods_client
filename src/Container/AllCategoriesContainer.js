import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import AllCategories from '../Components/AppComponent/AllCategories';
import C_Title_With_Desc from '../Components/C_Title_With_Desc';
import { connect } from 'react-redux';

const AllCategoriesContainer = ({categoriesRes}) => {
  return (
    <View style={styles.container}>
      <C_Title_With_Desc
        text_title="All Categories"
        text_desc="Explore Quality Cuts and Fresh Delicacies"
      />
      <FlatList
        data={categoriesRes}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={(item) => {
          return <AllCategories {...item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


const mapStateToProps = state => ({
  categoriesRes: state.categoriesReducers?.data?.categories,
});
export default connect(mapStateToProps)(AllCategoriesContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
