import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonStyles} from '../../Themes/CommonStyles';
import { connect } from 'react-redux';

const HomeHeader = ({verifyRes,cartRes,userLocationRes}) => {
  const isVerify = !!(verifyRes?.data?.accessToken || verifyRes?.data?.refreshToken);
  const cartLength = cartRes?.cartItems?.cart?.products?.length || 0;
  const navigation = useNavigation();
  const [cartItemCount, setItemCount] = useState(cartLength);
  useEffect(() => {
    setItemCount(cartLength);
  }, [cartLength]);

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
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.location} onPress={()=>{
          if (isVerify) {
            navigation.navigate('DefaultAddress');
          } else {
            navigation.navigate('SignIn',{fromScreen: 'Home'});
          }
        }}>
          <Icon name="location-on" size={24} color={Colors.red} />
          <View>
            <View style={styles.left}>
              <Text style={styles.locationText}>{selectedAddress?.city}</Text>
              {/* <TouchableOpacity> */}
                <Icon name="arrow-drop-down" size={25} color={Colors.black} />
              {/* </TouchableOpacity> */}
            </View>
            <Text style={styles.locationAddress}>
            {selectedAddress
                ? `${selectedAddress?.addressLine1}, `
                : 'Add your address'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.right}>
                <View style={styles.switch}>
                    <Text style={[styles.switchLabel, { color: !isWholesale ? Colors.red : Colors.gray, }]}>{isWholesale ? 'Wholesale' : 'Retail'}</Text>
                    <TouchableOpacity style={styles.switchButton} onPress={handleToggle}>
                        <View
                            style={[
                                styles.switchCircle,
                                { backgroundColor: isWholesale ? Colors.red : '#ccc', alignSelf: isWholesale ? 'flex-start' : 'flex-end' },
                            ]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.wholesaleLabel, { color: isWholesale ? Colors.red : Colors.gray, }]}>{isWholesale ? 'Retail' : 'Wholesale'}</Text>
                </View>
            </View> */}

      <TouchableOpacity
        onPress={() => {
          if (isVerify) {
            navigation.navigate('Cart');
          } else {
            navigation.navigate('SignIn',{fromScreen: 'Home'});
          }
        
          // navigation.navigate('Cart')
        }}
        style={CommonStyles.marginTop7}>
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
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  cartRes: state?.cartReducer,
  userLocationRes: state.userLocationReducers,
});
export default connect(mapStateToProps)(HomeHeader);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: 10,
    paddingTop: Platform.OS === 'ios' ? responsiveHeight(5) : null,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW600,
    marginLeft: responsiveWidth(2),
    color:Colors.darkgrey
  },
  locationAddress: {
    fontSize: FontSize.FS11,
    color: Colors.gray,
    marginLeft: responsiveWidth(2),
    width: responsiveWidth(45),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(-5),
  },
  statusIcons: {
    flexDirection: 'row',
    marginRight: 24,
  },
  switchLabel: {
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW700,
  },
  wholesaleLabel: {
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW700,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButton: {
    width: responsiveWidth(10),
    height: responsiveHeight(2.4),
    borderRadius: 12,
    backgroundColor: Colors.lightgrey,
    marginHorizontal: responsiveWidth(3),
    justifyContent: 'center',
  },
  switchCircle: {
    width: 15,
    height: 15,
    borderRadius: 7,
  },
  switchKnob: {
    width: 15,
    height: 15,
    borderRadius: 7,
  },
  badge: {
    position: 'absolute',
    top: -10,
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


