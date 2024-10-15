import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {responsiveHeight,responsiveWidth,} from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import OrderCom from './OrderCom';
import {connect, useDispatch} from 'react-redux';
import { fetchOrder } from '../../Redux/Actions/CartAction';

const OrderHistory = ({navigation,verifyRes,orderRes}) => {
  const dispatch = useDispatch();
  console.log("orderRes",JSON.stringify(orderRes,null,2))
  const fetchOrderFunction = useCallback(async () => {
    const payload = { authToken: verifyRes };
    dispatch(fetchOrder(payload));
  }, [dispatch, verifyRes]);

  useEffect(() => {
    if (verifyRes) {
      fetchOrderFunction();
    }
  }, [verifyRes, fetchOrderFunction]);

  const onRefresh = useCallback(() => {
    fetchOrderFunction();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={[1, 11, 1, 1, 1, 1]}
        // data={orderRes?.data?.data}
        renderItem={item => <OrderCom {...item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
            <RefreshControl
              refreshing={orderRes?.loading}
              onRefresh={onRefresh}
            />}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  verifyRes: state.verifyReducers.data?.authToken,
  orderRes:state?.orderReducers
});
export default connect(mapStateToProps)(OrderHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(3),
  },
  title: {
    fontSize: FontSize.FS17,
    fontWeight: FontsWeights.FW500,
    marginTop: responsiveHeight(1),
    color: Colors.black,
  },
});