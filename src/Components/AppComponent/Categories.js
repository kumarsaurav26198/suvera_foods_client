import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import Colors from '../../Themes/Colors';
import { FontSize } from '../../Themes/Fonts';
import ChickenCategoriesContainer from '../../Container/ChickenCategoriesContainer';
import MuttonCategoriesContainer from '../../Container/MuttonCategoriesContainer';
import FishCategoriesContainer from '../../Container/FishCategoriesContainer';
import EggCategoriesContainer from '../../Container/EggCategoriesContainer';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import { ProductsWithPricing } from '../../Redux/Actions/ProductActions';
import AppHeader from './AppHeader';

const Categories = ({ categoriesRes, categoryId, verifyRes }) => {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();

  const fetchProductsWithPricing = async () => {
    const payload = {
      token: verifyRes,
      categoryId:categoryId
    };
    // console.log("useEffect ProductsWithPricing ====>",payload)
    await dispatch(ProductsWithPricing(payload));
  };

  useEffect(() => {
    fetchProductsWithPricing();
  }, [dispatch]);

  useEffect(() => {
    setSelectedId(categoryId);
  }, [categoryId]);

  const handlePress = async id => {
    setSelectedId(id);
    const payload = {
      categoryId:id
    };
    await dispatch(ProductsWithPricing(payload));
  };

  const categoryComponents = {
    '66ac82ee1e69947ec44cf852': ChickenCategoriesContainer,
    '66ac83a61e69947ec44cf859': MuttonCategoriesContainer,
    '66ac83f31e69947ec44cf860': FishCategoriesContainer,
    '66ac848c1e69947ec44cf86e': EggCategoriesContainer,
  };

  const SelectedCategoryComponent = categoryComponents[selectedId] || null;

  const CategoryItem = ({ item, onPress, isSelected }) => (
    <View style={styles.itemContainerWrapper}>
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItem]}
        onPress={onPress}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.imgURL }} style={styles.image} />
        </View>
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      {isSelected && <View style={styles.bottomView} />}
    </View>
  );

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <AppHeader cart  text="Categories"/>
      <FlatList
        data={categoriesRes}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() => handlePress(item._id)}
            isSelected={item._id === selectedId}
          />
        )}
        keyExtractor={item => item._id}
        numColumns={4} 
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      {SelectedCategoryComponent && <SelectedCategoryComponent />}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  itemText: {
    marginTop: responsiveHeight(1),
    color: Colors.black,
    textAlign: 'center',
    fontSize: FontSize.FS15,
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 9,
    width: '100%', // Ensure the width adjusts for each item
  },
  itemContainerWrapper: {
    flex: 1,
    margin: 5, // Adjust margin as needed
  },
  selectedItem: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    backgroundColor: Colors.inputFieldBg,
    marginBottom: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  selectedText: {
    marginTop: responsiveHeight(1),
    color: Colors.red,
    textAlign: 'center',
    fontSize: FontSize.FS15,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    height: 6,
    backgroundColor: 'red',
    width: '90%',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({
  categoriesRes: state?.categoriesReducers?.data?.categories || [],
  productPriceRes: state.productPriceReducers?.data,
  verifyRes: state?.verifyReducers?.data?.authToken,
});

export default connect(mapStateToProps)(Categories);
