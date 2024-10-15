import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../Components/AppComponent/AppHeader';
import ImageSlider from '../../Components/AppComponent/ImageSlider';
import C_Title_With_Desc from '../../Components/C_Title_With_Desc';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import images from '../../Themes/Images';

const ComboDetails = () => {
  const healthBenefits = [
    'High in Omega-3 Fatty Acids: Supports heart health and reduces inflammation.',
    'Rich in Protein: Essential for muscle repair and growth.',
    'Vitamins and Minerals: Supports overall health and wellbeing.',
    'Low in Carbohydrates: Suitable for low-carb and keto diets.',
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <AppHeader text={'Super Combo'} cart />
            <ImageSlider />
            <View style={styles.midContent}>
              <C_Title_With_Desc text_title={'Super Combo'} />
              <Text style={styles.infoDesc}>{healthBenefits.join('\n')}</Text>
              <Text style={styles.cartTitle}>Items in the Combo Pack</Text>
              <FlatList
                data={[ 1, 1 ]}
                columnWrapperStyle={styles.row}
                renderItem={() => (
                  <View style={styles.itemContainer}>
                    <View style={styles.itemImageContainer}>
                      <Image
                        source={images.chickenSlice}
                        style={styles.itemImage}
                      />
                    </View>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {'Super Combo item'}
                      </Text>
                      <Text style={styles.itemWeight}>550 Kg</Text>
                      <Text style={styles.itemPrice}>₹400</Text>
                      <Text style={styles.comboText}>1 X Pack</Text>
                    </View>
                    <View style={styles.itemQuantity} />
                  </View>
                )}
                ListFooterComponent={<View style={{ height: 100 }} />}
              />
            </View>
          </>
        )}
      />
      <View style={styles.cartBottom}>
        <View style={{ flexDirection: 'row' ,justifyContent:"space-between"}}>
          <View>
            <Text style={styles.priceAmount}>₹679</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.comboText}>{"Get this Combo at"}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            // onPress={() => {
            //   if (verifyRes?.data?.authToken)
            //   {
            //     const payload = {
            //       product: product?._id,
            //       quantity: 1,
            //       authToken: verifyRes?.data?.authToken || null
            //     };
            //     dispatch(addToCart(payload));
            //     navigation.navigate('Cart');
            //   }else{
            //     navigation.navigate('SignIn',{fromScreen: 'ProductsDescription'});
            //   }


            // }}
            >
            <Text style={styles.bookButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ComboDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  midContent: {
    paddingHorizontal: 15,
  },
  infoDesc: {
    color: Colors.gray,
    fontSize: FontSize.FS14,
  },
  cartTitle: {
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
    paddingVertical: 13,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImageContainer: {
    backgroundColor: Colors.bgGreen,
    width: Dimensions.get('screen').width * 0.2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  itemDetails: {
    width: Dimensions.get('screen').width * 0.43,
  },
  itemName: {
    fontSize: FontSize.FS12,
    color: Colors.black,
  },
  itemQuantity: {
    width: Dimensions.get('screen').width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  padding9: {
    padding: 9,
    color: Colors.black,
  },
  itemWeight: {
    fontSize: FontSize.FS12,
    color: Colors.green,
    fontWeight: FontsWeights.FW600,
  },
  itemPrice: {
    color: Colors.black,
    fontWeight: FontsWeights.FW600,
  },
  comboText: {
    color: Colors.red,
    fontWeight: FontsWeights.FW500,
  },
  bookButton: {
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW600,
  },
  cartBottom: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    padding: 15,
    width: Dimensions.get('screen').width,
  },
  priceAmount: {
    fontSize: FontSize.FS15,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  amountDiscount: {
    fontSize: FontSize.FS15,
    textDecorationLine: 'line-through',
    color: Colors.darkgrey,
  },
});
