import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../Themes/Colors';
import C_Button from '../../Components/C_Button';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import images from '../../Themes/Images';
import AppHeader from '../../Components/AppComponent/AppHeader';
import {connect, useDispatch} from 'react-redux';
import {
  fetchCart,
  removeFromCart,
  upadteCartQuantity,
} from '../../Redux/Actions/CartAction';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
  placeOrderApiCall,
  UpdateCartAddress,
  UpdatePaymentMode,
} from '../../services/Api';
import C_DropDown from '../../Components/AppComponent/C_DropDown';
import Address_DropDown from '../../Components/AppComponent/Address_DropDown';

function Cart({navigation, verifyRes, cartRes, userLocationRes}) {
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const cartIDatas = cartRes?.cartItems?.cart?.products;
  const cartpaymentMethod = cartRes?.cartItems?.cart?.paymentMethod;
  const cartAddress = cartRes?.cartItems?.cart?.address?.addressLine1;
  const billingData = cartRes?.cartItems?.cart?.billing;

  // console.log("cartAddress",verifyRes?.data?.authToken)
  // console.log("cartRes========>>",JSON.stringify(cartRes,null,2))
  const handlePaymentMethodSelect = useCallback(async method => {
    const payload = {
      paymentMethod: method,
      authToken: verifyRes?.data?.authToken,
    };
    try {
      const response = await UpdatePaymentMode(payload);
      console.log('UpdatePaymentMode  successfully:');
      fetchCartFunction();
    } catch (error) {
      console.error(
        'Error placing order:',
        error.message,
        'Status:',
        error.status,
      );
    }
  }, []);

  const handleSelectAddress = useCallback(async address => {
    const payload = {
      addressId: address,
      authToken: verifyRes?.data?.authToken,
    };
    try {
      const response = await UpdateCartAddress(payload);
      console.log('UpdateCartAddress  successfully:');
      fetchCartFunction();
    } catch (error) {
      console.error(
        'Error placing order:',
        error.message,
        'Status:',
        error.status,
      );
    }
  }, []);
  const addressOptions = userLocationRes?.map(item => ({
    label: `${item.addressLine1}`,
    value: item._id,
  }));

  const paymentOptions = [
    {label: 'COD', value: 'cod'},
    {label: 'ONLINE', value: 'online'},
  ];

  useEffect(() => {
    if (!selectedAddress) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [selectedAddress, blinkAnim]);

  const getAddress = () => {
    if (userLocationRes?.length > 0) {
      const primaryAddress = userLocationRes.find(
        address => address.primaryAddress === true,
      );
      return primaryAddress || userLocationRes[0];
    }
    return null;
  };
  const selectedAddress = getAddress();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCartFunction();
  }, []);

  const fetchCartFunction = async () => {
    const payload = {
      authToken: verifyRes?.data?.authToken,
      refresh:verifyRes?.data?.refreshToken,
      type:"retail"
    };
    dispatch(fetchCart(payload));
  };
  const placeOrderAoiCallFunction = async () => {
    const authToken = verifyRes?.data?.authToken;
    const selectedAddress = getAddress();

    if (!selectedAddress) {
      console.error('Error: No selected address available');
      return;
    }

    try {
      setPlaceOrderLoading(true);
      const response = await placeOrderApiCall(authToken, selectedAddress);
      setPlaceOrderLoading(false);
      fetchCartFunction();
      console.log('Order placed successfully:', response);
    } catch (error) {
      console.error(
        'Error placing order:',
        error.message,
        'Status:',
        error.status,
      );
      // setErrors({password: error?.message});
      setPlaceOrderLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchCartFunction();
  }, []);

  const increaseQuantity = ({id, quantity}) => {
    const payload = {
      authToken: verifyRes?.data?.authToken,
      product: id,
      quantity: quantity + 1,
    };
    // console.log('increaseQuantity==================>',payload);
    dispatch(upadteCartQuantity(payload));
  };

  const decreaseQuantity = ({id, quantity}) => {
    if (quantity <= 1) {
      const payload = {
        authToken: verifyRes?.data?.authToken,
        product: id,
      };
      // console.log('removeFromCart==================>');
      dispatch(removeFromCart(payload));
    } else {
      const payload = {
        authToken: verifyRes?.data?.authToken,
        product: id,
        quantity: quantity - 1,
      };
      // console.log('updateCartItemQuantity============>');
      dispatch(upadteCartQuantity(payload));
    }

    // console.log(payload)

    // dispatch(updateCartItemQuantity(itemId, 'decrease'));
  };

  return (
    <View style={styles.container}>
      <AppHeader text="Cart" />
      <View>
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.cartContainer}>
              {cartIDatas?.length > 0 ? (
                <>
                  <Text style={styles.cartTitle}>Review Items</Text>
                  <FlatList
                    data={cartIDatas}
                    columnWrapperStyle={styles.row}
                    renderItem={({item}) => {
                      // console.log(
                      //   'cartRes=====>>',
                      //   JSON.stringify(item, null, 2),
                      // );
                      return (
                        <View style={styles.itemContainer}>
                          <View style={styles.itemImageContainer}>
                            {item?.product.images ? (
                              <Image
                                source={{uri: item?.product?.images[0]}}
                                style={styles.itemImage}
                              />
                            ) : null}
                          </View>
                          <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={2}>
                              {item?.product?.name}
                            </Text>
                            <Text style={styles.itemWeight}>
                              {item?.product?.quantity}
                              {item?.product?.quantityType === 'weight'
                                ? ' Kg'
                                : null}
                              {item?.product?.quantityType === 'count'
                                ? ' Total'
                                : null}
                            </Text>
                            <Text style={styles.itemPrice}>
                              ₹{item?.productPrice}
                            </Text>
                            <View style={styles.itemOfferContainer}>
                              <Text style={styles.itemMRP}>
                                ₹
                                {item?.product?.pricep
                                  ? item?.product?.pricep
                                  : 0}{' '}
                              </Text>
                              <Text style={styles.itemOff}>
                                {'   '}
                                0% OFF
                              </Text>
                            </View>
                          </View>
                          <View style={styles.itemQuantity}>
                            <TouchableOpacity
                              onPress={() =>
                                decreaseQuantity({
                                  id: item?.product._id,
                                  quantity: item.quantity,
                                })
                              }>
                              <Text style={styles.desButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.padding9}>
                              {item?.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                increaseQuantity({
                                  id: item?.product._id,
                                  quantity: item.quantity,
                                })
                              }>
                              <Text style={styles.plusButton}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    }}
                    // keyExtractor={item => item.id.toString()}
                  />
                </>
              ) : (
                <>
                  <View style={styles.emptyTopContaner}>
                    <Text style={styles.title}>Your Cart is Empty!</Text>
                    <Text style={styles.subTitle}>
                      Don't worry, we've got the freshest meats waiting for you.
                      Explore our selection and add your favorites to the cart!
                    </Text>
                    <C_Button
                      title="Start Shopping"
                      backgroundColor={Colors.black}
                      text_color={Colors.white}
                      onPress={() => {
                        navigation.navigate('Home');
                      }}
                    />
                  </View>
                  {/* <View style={styles.topPickContainer}>
                    <C_Title_With_Desc
                      style={{ marginLeft: 10, marginTop: 30 }}
                      text_title="Top Picks for You"
                    />
                    <BestSellers />
                  </View> */}
                </>
              )}
              {cartIDatas?.length > 0 ? (
                <>
                  <Text style={styles.cartTitle}>Offers</Text>
                  <TouchableOpacity
                    style={styles.offerContainer}
                    onPress={() => {
                      navigation.navigate('CouponScreen');
                    }}>
                    <Text style={styles.couponTitle}>Apply coupun</Text>
                    <Feather
                      name="chevron-right"
                      color={Colors.black}
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cartTitle}>Bill Summary</Text>
                  <View style={styles.billContainer}>
                    <View style={styles.flexRow}>
                      <Text style={styles.billText}>Sub Total</Text>
                      <Text style={styles.billText}>
                        ₹{billingData?.subTotal}
                      </Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.billText}>Delivery Fee</Text>
                      <Text style={styles.billText}>
                        ₹{billingData?.deliveryCharges}
                      </Text>
                    </View>
                    <View style={styles.taxContainer}>
                      <View style={styles.flexRow}>
                        <Text style={styles.billText}>Coupon Discounts</Text>
                        <Text style={styles.billText}>
                          ₹{billingData?.couponDiscounts}
                        </Text>
                      </View>
                      <View style={styles.flexRow}>
                        <Text style={styles.billText}>Platform Fee</Text>
                        <Text style={styles.billText}>
                          ₹{billingData?.platformFee}
                        </Text>
                      </View>

                      <View style={styles.flexRow}>
                        <Text style={styles.billText}>GST Charges</Text>
                        <Text style={styles.billText}>₹{billingData?.gst}</Text>
                      </View>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.billFinal}>To Pay</Text>
                      <Text style={styles.billFinal}>
                        <Text style={styles.billText}>
                          ₹{billingData?.netPay}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          )}
          ListFooterComponent={<View style={{height: 200}} />}
          refreshControl={
            <RefreshControl
              refreshing={cartRes?.loading}
              onRefresh={onRefresh}
            />
          }
        />
        {cartIDatas?.length > 0 ? (
          <View style={styles.cartBottom}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image source={images.map} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 15,
                  flex: 1,
                }}>
                <View>
                  {/* <Text style={styles.itemPrice}>Deliver to</Text> */}
                  <View>
                    <Address_DropDown
                      listData={addressOptions}
                      onValueChange={handleSelectAddress}
                      placeholder="Select Address"
                      initialValue={cartAddress}
                    />
                    {/* {selectedAddress ? (
                      <Text style={styles.locationAddress}>
                        {`${ selectedAddress?.addressLine1 }, `}
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DefaultAddress');
                        }}>
                        <Animated.Text
                          style={[
                            styles.locationAddress,
                            { opacity: blinkAnim },
                            { color: 'red' },
                          ]}>
                          Add your address
                        </Animated.Text>
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DefaultAddress');
                  }}>
                  <Entypo name="squared-plus" color={Colors.black} size={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomPrice}>
              <View>
                <Text style={styles.itemPrice}>{billingData?.netPay}</Text>
                <Text style={styles.itemWeight}>Net Payable</Text>
              </View>
              <C_DropDown
                listData={paymentOptions}
                onValueChange={handlePaymentMethodSelect}
                placeholder="Payment Method"
                initialValue={cartpaymentMethod}
              />
              <C_Button
                title="Continue to Pay"
                backgroundColor={Colors.black}
                text_color={Colors.white}
                onPress={placeOrderAoiCallFunction}
                loading={placeOrderLoading}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  cartRes: state?.cartReducer,
  userLocationRes: state.userLocationReducers?.address,
});
export default connect(mapStateToProps)(Cart);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  emptyTopContaner: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.FS15,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: FontSize.FS12,
  },
  topPickContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    bottom: 0,
  },
  cartContainer: {
    padding: 15,
  },
  cartBottom: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    bottom: 50,
    position: 'absolute',
    padding: 15,
    width: Dimensions.get('screen').width,
  },
  bottomPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTitle: {
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
    paddingVertical: 3,
  },
  offerContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  couponTitle: {
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  billContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  taxContainer: {
    marginVertical: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  billText: {
    color: Colors.black,
  },
  billFinal: {
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
    marginVertical: 7,
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
    // alignItems: 'center',
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
  desButton: {
    backgroundColor: Colors.inputColor,
    padding: 9,
    borderRadius: 5,
    color: Colors.black,
    fontSize: FontSize.FS18,
  },
  plusButton: {
    backgroundColor: Colors.black,
    padding: 9,
    borderRadius: 5,
    color: Colors.white,
    fontSize: FontSize.FS18,
  },
  itemName: {
    fontSize: FontSize.FS12,
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
  itemOfferContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemMRP: {
    color: Colors.gray,
    textDecorationLine: 'line-through',
  },
  itemOff: {
    color: Colors.green,
    fontSize: FontSize.FS10,
    fontWeight: FontsWeights.FW600,
  },
  locationAddress: {
    fontSize: FontSize.FS11,
    color: Colors.gray,
    width: responsiveWidth(55),
  },
});
