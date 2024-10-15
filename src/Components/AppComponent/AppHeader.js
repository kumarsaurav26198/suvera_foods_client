import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

function AppHeader({text, cart,verifyRes,cartRes}) {
  const navigation = useNavigation();
  const cartLength = cartRes?.cartItems?.cart?.products?.length || 0;
  const isVerify = !!(verifyRes?.data?.accessToken || verifyRes?.data?.refreshToken);
  const handlePressBack = () => {
    navigation.goBack();
  };
  const handlePressCart = () => {
    if (isVerify) {
      navigation.navigate('Cart');
    } else {
      navigation.navigate('SignIn',{fromScreen: 'Categories'});
    }
  };
  const [cartItemCount, setItemCount] = useState(cartLength);

  useEffect(() => {
    setItemCount(cartLength);
  }, [cartLength]);
  return (
    <View style={[styles.outerContainer]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePressBack}>
          <MaterialIcons name="arrow-back" color={Colors.black} size={25} />
        </TouchableOpacity>
        <Text style={[styles.headText]}>{text}</Text>
      </View>
      <View style={styles.container}>
        {cart ? (
          <TouchableOpacity
            onPress={handlePressCart}
            style={styles.cartContainer}>
            <Ionicons name="cart-outline" color={Colors.black} size={25} />
            {
          isVerify?<>
          {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
          </>:null
        }
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}


const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  cartRes: state?.cartReducer,
});
export default connect(mapStateToProps)(AppHeader);

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headText: {
    fontWeight: FontsWeights.FW500,
    marginLeft: 10,
    fontSize: FontSize.FS16,
    color: Colors.black,
  },
  cartContainer: {
    position: 'relative',
    marginRight: 10,
  },
  cartIcon: {
    fontWeight: FontsWeights.FW500,
    fontSize: FontSize.FS16,
    color: Colors.black,
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: -8,
    backgroundColor: Colors.red,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW600,
  },
});
