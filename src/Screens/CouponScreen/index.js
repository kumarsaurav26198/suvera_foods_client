import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Colors from '../../Themes/Colors';
import AppHeader from '../../Components/AppComponent/AppHeader';
import SearchBar from '../../Components/SearchBar';
import ApplyCoupon from '../../Components/ApplyCoupon';
import {connect, useDispatch} from 'react-redux';
import {fetchCoupon} from '../../Redux/Actions/CartAction';

const CouponScreen = ({couponRes, navigation}) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCouponFunction();
  }, []);

  const fetchCouponFunction = async () => {
    dispatch(fetchCoupon());
  };

  const onRefresh = useCallback(() => {
    fetchCouponFunction();
  }, []);

  const handleSearch = text => {
    setSearchText(text);
  };

  const filteredCoupons = couponRes?.data?.coupons?.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <AppHeader text="Apply Coupon" />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search for Coupon"
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            if (filteredCoupons?.length === 1) {
              console.log(filteredCoupons[0]);
            }
            navigation.goBack();
            // handleSearch()
            // navigation.goBack()
          }}>
          <Text style={styles.applyButtonText}>
            {filteredCoupons?.length === 1 ? 'Apply' : 'Find'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCoupons}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ApplyCoupon {...item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={couponRes?.loading}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  couponRes: state?.couponReducers,
});
export default connect(mapStateToProps)(CouponScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputFieldBg,
  },
  searchBar: {
    flex: 0.8,
  },
  applyButton: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
