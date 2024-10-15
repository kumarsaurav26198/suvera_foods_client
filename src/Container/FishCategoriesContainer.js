import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../Themes/Colors';
import { FontSize, FontsWeights } from '../Themes/Fonts';
import PremiumFishContainer from './PremiumFishContainer';
import RegularFishContainer from './RegularFishContainer';
import { connect } from 'react-redux';

const FishCategoriesContainer = ({ productPriceRes }) => {
  const [selectedCategory, setSelectedCategory] = useState('Regular');

  useEffect(() => {
    console.log("Updated selectedCategory:", selectedCategory);

  }, [selectedCategory]); 

  const handlePress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Regular' && styles.selectedButton]}
          onPress={() => handlePress('Regular')}>
          <Text style={[styles.buttonText, selectedCategory === 'Regular' && styles.selectedButtonText]}>
            Regular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Premium' && styles.selectedButton]}
          onPress={() => handlePress('Premium')}>
          <Text style={[styles.buttonText, selectedCategory === 'Premium' && styles.selectedButtonText]}>
            Premium
          </Text>
        </TouchableOpacity>
      </View>
      {
        selectedCategory === 'Regular' ? <RegularFishContainer /> : <PremiumFishContainer />
      }
    </View>
  );
};

const mapStateToProps = state => ({
  productPriceRes: state.productPriceReducers?.data?.data,
});
export default connect(mapStateToProps)(FishCategoriesContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
  },
  button: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(13),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  selectedButton: {
    backgroundColor: Colors.black,
  },
  buttonText: {
    color: Colors.black,
    fontSize: FontSize.FS15,
    textAlign: 'center',
    fontWeight: FontsWeights.FW600,
  },
  selectedButtonText: {
    fontWeight: FontsWeights.FW700,
    color: Colors.white
  },
});
