import { FlatList, StyleSheet,  View, ActivityIndicator } from 'react-native';
import React from 'react';
import AllCategoriesCom from '../Components/AppComponent/AllCategoriesCom';
import { connect } from 'react-redux';
import Colors from '../Themes/Colors';

const EggCategoriesContainer = ({ productPriceRes }) => {
  const { loading, data } = productPriceRes || {};

  return (
    <View>
      {loading ? (
         <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.gray} />
        </View>
      ) : (
        <FlatList
          data={data?.products}
          renderItem={({ item }) => <AllCategoriesCom {...item} />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  productPriceRes: state.productPriceReducers,
});

export default connect(mapStateToProps)(EggCategoriesContainer);

const styles = StyleSheet.create({
  container: {
    marginTop:100
  },
});