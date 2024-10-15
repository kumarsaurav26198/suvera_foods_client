import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {connect, useDispatch} from 'react-redux';
import {applyCouponRequest} from '../Redux/Actions/CartAction';

const ApplyCoupon = props => {
  const {
    isActive=true,
    title,
    description,
    discountType,
    discountValue,
    minimumOrderValue,
    expiration,
    couponCode,
    _id,
    verifyRes,
  } = props;

  // console.log("verifyRes",verifyRes)
  const formatDateAndTime = isoString => {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };
  const dispatch = useDispatch();

  // const formattedExpiration = moment(expiration).format('YYYY-MM-DD'); // Formatting the expiration date

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.discountContainer,
          {backgroundColor: isActive ? Colors.red : Colors.lightgrey},
        ]}
      />
      <Text numberOfLines={1} style={styles.discountText}>
        {discountType === 'amount'
          ? `₹${discountValue} OFF`
          : `${discountValue}% OFF`}
      </Text>
      <View style={styles.rightContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.couponCode}>{title}</Text>
          <Text
            style={[
              styles.couponDetails,
              {color: isActive ? Colors.green : Colors.gray},
            ]}>
            Add ₹{minimumOrderValue} more to avail this offer
          </Text>
        </View>
        <View
          style={[
            styles.buttonContainer,
            {backgroundColor: isActive ? '#038A1126' : Colors.lightgrey},
          ]}>
          <View
            style={[
              styles.statusDot,
              {backgroundColor: isActive ? Colors.green : Colors.gray},
            ]}
          />
          <Text style={styles.activeText}>
            {isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.midContainer}>
        <Text style={styles.midText}>{description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text
          style={[
            styles.validateText,
            {color: isActive ? Colors.red : Colors.gray},
          ]}>
          {/* {isActive ? `Valid till: ${formatDateAndTime(expiration)}` : 'Expired'} */}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const payload = {
              authToken: verifyRes?.authToken,
              couponId: _id,
            };
            dispatch(applyCouponRequest(payload));

            // console.log(payload);
             props.navigation.goBack()
          }}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers?.data,
});
export default connect(mapStateToProps)(ApplyCoupon);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    backgroundColor: Colors.bgColor,
    borderRadius: 20,
    borderColor: Colors.borderColor,
    overflow: 'hidden',
    height: 200,
    marginHorizontal: 15,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  discountContainer: {
    height: '100%',
    width: 35,
  },
  discountText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    position: 'absolute',
    top: '45%',
    bottom: '45%',
    left: -15,
    transform: [{rotate: '270deg'}, {scale: 0.9}],
    textAlign: 'center',
    justifyContent: 'center',
    height: 30,
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  couponCode: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 5,
  },
  couponDetails: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  activeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.successColor,
  },
  midContainer: {
    position: 'absolute',
    top: '42%',
    left: 50,
    right: 20,
    borderTopWidth: 1,
    borderStyle: 'dotted',
    borderTopColor: 'black',
  },
  midText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: Colors.gray,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 5,
    top: 20,
    left: 20,
    borderTopLeftRadius: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 5,
  },
});
