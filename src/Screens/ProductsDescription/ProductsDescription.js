import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ImageSlider from '../../Components/AppComponent/ImageSlider';
import C_Title_With_Desc from '../../Components/C_Title_With_Desc';
import BestSellers from '../../Components/AppComponent/BestsellersComponent';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Arrow_Button from '../../Components/AppComponent/Arrow_Button';
import AppHeader from '../../Components/AppComponent/AppHeader';
import { useRoute } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import { connect, useDispatch } from 'react-redux';
import { ProductByID } from '../../Redux/Actions/ProductActions';
import { addToCart } from '../../Redux/Actions/CartAction';

const ProductsDescription = ({ verifyRes, navigation, productByIDRes,cartRes }) => {
  // console.log("cartRes",JSON.stringify(cartRes,null,2))
  const route = useRoute();
  const { Premium, productId } = route?.params;
  const dispatch = useDispatch();
  const product = productByIDRes?.data?.product;
  const cartLength = cartRes?.cartItems?.cart?.products?.length || 0;
  const billingData = cartRes?.cartItems?.cart?.billing;
  // console.log("cartLength =======>>", JSON.stringify(cartLength, null, 2));

  const fetchProductsWithPricing = async () => {
    const payload = {
      token: verifyRes,
      productId: productId
    };
    await dispatch(ProductByID(payload));
  };

  useEffect(() => {
    fetchProductsWithPricing();
  }, [ dispatch ]);



  const [ deliveryDates, setDeliveryDates ] = useState([]);
  useEffect(() => {
    const dummyDates = [
      { id: 'date1', name: 'Delivery Date 1', selected: false },
      { id: 'date2', name: 'Delivery Date 2', selected: false },
      { id: 'date3', name: 'Delivery Date 3', selected: false },
      { id: 'date4', name: 'Delivery Date 4', selected: false },
    ];
    setDeliveryDates(dummyDates);
  }, []);

  const handleDateToggle = id => {
    setDeliveryDates(prevDates =>
      prevDates.map(date => {
        if (date.id === id)
        {
          return { ...date, selected: true };
        }
        return { ...date, selected: false };
      }),
    );
  };

  const healthBenefits = [
    'High in Omega-3 Fatty Acids: Supports heart health and reduces inflammation.',
    'Rich in Protein: Essential for muscle repair and growth.',
    'Vitamins and Minerals: Supports overall health and wellbeing.',
    'Low in Carbohydrates: Suitable for low-carb and keto diets.',
  ];

  const formattedBenefits = healthBenefits
    .map(benefit => `\u2022 ${ benefit }`)
    .join('\n');

  return (
    <View style={styles.container}>
      <AppHeader text={'Products Description'} cart  />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <ImageSlider data={product?.images} />
            <View style={{ paddingHorizontal: 10 }}>
              <C_Title_With_Desc text_title={product?.name} />
              {Premium ? (
                <Text style={styles.premiumText}>Premium sea food</Text>
              ) : null}
              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text numberOfLines={1} style={styles.infoHeader}>
                    Weights
                  </Text>
                  <Text style={styles.infoText}>{product?.quantity ? product?.quantity : 0} kg</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text numberOfLines={1} style={styles.infoHeader}>
                    Pieces
                  </Text>
                  <Text style={styles.infoText}>{'1-5'}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text numberOfLines={1} style={styles.infoHeader}>
                    Serves
                  </Text>
                  <Text style={styles.infoText}>1-2</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text numberOfLines={1} style={styles.infoHeader}>
                    Quantity
                  </Text>
                  <Text style={styles.infoText}>1</Text>
                </View>
              </View>
              <Text style={styles.infoDesc}>
                {product?.description}
              </Text>
              <Text style={styles.infoDesc}>
                Health Benefits{'\n'}
                {formattedBenefits}
              </Text>
              {Premium ? (
                <>
                  <C_Title_With_Desc text_title="Select delivery date" />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.selectDeliveryDate}>
                    {deliveryDates.map(date => (
                      <TouchableOpacity
                        key={date.id}
                        style={styles.dateRow}
                        onPress={() => handleDateToggle(date.id)}>
                        <CheckBox
                          isChecked={date.selected}
                          onClick={() => handleDateToggle(date.id)}
                        />
                        <Text
                          style={[
                            styles.dateText,
                            { color: date.selected ? Colors.black : Colors.gray },
                          ]}>
                          {date.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              ) : null}
              <C_Title_With_Desc text_title="Discover More Fish Favorites" />
              <BestSellers />
            </View>
          </>
        )}
        ListFooterComponent={<View style={{ height: 130 }} />}
      />
      <View style={styles.bottomwithButtomContainer}>
        <Arrow_Button title="View Cart" itemCount={cartLength} price={cartLength>0?billingData?.subTotal:0} onPress={()=>{navigation.navigate("Cart")}} />
        <View style={styles.bottomFixed}>
          <View>
            <Text style={styles.priceAmount}>₹679</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.amountDiscount}>₹{product?.price ? product?.price : 0}</Text>
              <Text style={styles.priceOff}>20% OFF</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              verifyRes?.data?.authToken
                ? navigation.navigate('Cart', {productPrice: '1234t89876543'})
                : navigation.navigate('SignIn', {
                    fromScreen: 'ProductsDescription',
                    productPrice: '1234t89876543',
                  });
            }}> */}
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              if (verifyRes?.data?.authToken)
              {
                const payload = {
                  product: product?._id,
                  quantity: 1,
                  authToken: verifyRes?.data?.authToken || null,
                  refresh:verifyRes?.data?.refreshToken|| null,
                  type:"retail"
                };
                dispatch(addToCart(payload));
                navigation.navigate('Cart');
              }else{
                navigation.navigate('SignIn',{fromScreen: 'ProductsDescription'});
              }


            }}>
            <Text style={styles.bookButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  productByIDRes: state?.productByIDReducers,
  cartRes: state?.cartReducer,
});
export default connect(mapStateToProps)(ProductsDescription);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomFixed: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 10,
  },
  bottomwithButtomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  priceOff: {
    fontSize: FontSize.FS11,
    left: 15,
    color: Colors.lightgreen,
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
  bookButton: {
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 60,
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
  infoContainer: {
    width: 375,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(2.2),
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: Colors.lightgrey,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: Colors.lightgrey,
  },
  infoHeader: {
    backgroundColor: Colors.lightgrey,
    width: '100%',
    paddingVertical: 10,
    fontSize: FontSize.FS17,
    textAlign: 'center',
  },
  infoText: {
    color: Colors.black,
    fontSize: FontSize.FS16,
    paddingVertical: 10,
  },
  infoDesc: {
    color: Colors.gray,
    fontSize: FontSize.FS14,
    paddingVertical: 15,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  premiumText: {
    color: Colors.green,
    fontSize: FontSize.FS13,
    backgroundColor: Colors.pale_green,
    width: '37%',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 7,
    // paddingVertical: 15,
  },
  selectDeliveryDate: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  dateText: {
    marginRight: 18,
    marginLeft: 5,
    fontSize: FontSize.FS13,
  },
});
