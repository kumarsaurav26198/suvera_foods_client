import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import {useNavigation} from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/CartAction';

const AllCategoriesCom = ({
  Premium = false,
  name,
  quantity,
  images,
  price,
  description,
  _id,
  verifyRes,
  cartRes
}) => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const isVerify = !!(verifyRes?.accessToken || verifyRes?.refreshToken);

  const handlePressAdd = (id) => {
    if (!isVerify) {
      navigation.navigate('SignIn',{fromScreen: 'Categories'});
    } else {
      const payload = {
        product: id,
        quantity: 1,
        authToken: verifyRes?.accessToken,
        refresh:verifyRes?.refreshToken,
      };
      dispatch(addToCart(payload));
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          navigation.navigate('ProductsDescription', {Premium: Premium,productId: _id,})
        }>
     {images && images.length > 0 ? (
          <Image source={{ uri: images[0] }} style={styles.image} resizeMode="cover" />
        ) : (
          <Image source={require('../../Assets/Images/Fish.png')} style={styles.image} resizeMode="cover" />
        )}
      </TouchableOpacity>
      <View style={styles.productDetailsWrapper}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text numberOfLines={1} style={styles.infoHeader}>
              Weights
            </Text>
            <Text style={styles.infoText}>{'500 g'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text numberOfLines={1} style={styles.infoHeader}>
              Pieces
            </Text>
            <Text style={styles.infoText}>{price}</Text>
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
            <Text style={styles.infoText}>{quantity}</Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.infoDesc}>
          {description}
        </Text>
        <View style={styles.bottomFixed}>
          <View>
            <Text style={styles.priceAmount}>₹{price}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.amountDiscount}>₹820</Text>
              <Text style={styles.priceOff}>20% OFF</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={()=>handlePressAdd(_id)}>
            <Text style={styles.bookButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const mapStateToProps = state => ({
  verifyRes: state.verifyReducers?.data,
  cartRes: state?.cartReducer?.cartItems,
});
export default connect(mapStateToProps)(AllCategoriesCom);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    marginTop: 15,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    height: 150,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.pale_green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  productDetailsWrapper: {
    paddingHorizontal: 10,
    width: '98%',
  },
  title: {
    color: Colors.black,
    paddingTop: 10,
    fontSize: FontSize.FS16,
  },
  infoContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: Colors.lightgrey,
    overflow: 'hidden',
  },
  infoItem: {
    flex: 1,
    borderWidth: 0.8,
    borderColor: Colors.lightgrey,
  },
  infoHeader: {
    backgroundColor: Colors.lightgrey,
    width: '100%',
    fontSize: FontSize.FS13,
    textAlign: 'center',
    color: Colors.darkgrey,
  },
  infoText: {
    color: Colors.black,
    fontSize: FontSize.FS11,
    textAlign: 'center',
  },
  infoDesc: {
    color: Colors.gray,
    fontSize: FontSize.FS12,
    width: '70%',
  },
  bottomFixed: {
    width: '70%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 5,
  },
  priceOff: {
    fontSize: FontSize.FS11,
    left: 15,
    color: Colors.lightgreen,
  },
  priceAmount: {
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  amountDiscount: {
    fontSize: FontSize.FS12,
    textDecorationLine: 'line-through',
    color: Colors.darkgrey,
  },
  bookButton: {
    backgroundColor: Colors.black,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    right: 15,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW600,
  },
});
