import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, RefreshControl, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import HomeSliderContainer from '../../Container/HomeSliderContainer';
import AllCategoriesContainer from '../../Container/AllCategoriesContainer';
import SearchBar from '../../Components/SearchBar';
import HomeHeader from '../../Components/AppComponent/HomeHeader';
import BestSellers from '../../Components/AppComponent/BestsellersComponent';
import HomeVideoBanner from '../../Components/AppComponent/HomeVideoBanner';
import FeedBackContainer from '../../Container/FeedBackContainer';
import C_Title_With_Desc from '../../Components/C_Title_With_Desc';
import SocialIconContainer from '../../Components/SocialIconContainer';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import GetLocation from 'react-native-get-location';
import {
  CheckUserLocation,
  fetchAllbanner,
  fetchBestSeller,
  fetchCategories,
  fetchCombo,
  fetchSocialMedia,
  getUserLocation,
} from '../../Redux/Actions/CommonActions';
import Loader from '../../Components/Loader';
import { fetchCart } from '../../Redux/Actions/CartAction';
import NewCombo from '../../Components/NewCombo';

function Home({
  socialMediaRes,
  categoriesRes,
  verifyRes,
  userLocationRes,
  cartRes,
  bestSellerRes,
  comboRes,
  bannnerRes
}) {
  const [ searchText, setSearchText ] = useState('');
  const [ location, setLocation ] = useState(null);
  const [ refreshing, setRefreshing ] = useState(false);
  const dispatch = useDispatch();
  const isVerify = !!(verifyRes?.data?.accessToken || verifyRes?.data?.refreshToken);

  const loading = socialMediaRes?.loading || categoriesRes?.loading || cartRes?.loading || bestSellerRes?.loading || bannnerRes?.loading || comboRes?.loading;

  const fetchData = useCallback(async () => {
    await dispatch(fetchCategories());
    await dispatch(fetchAllbanner());
    await dispatch(fetchBestSeller());
    await dispatch(fetchCombo());
    // await dispatch(fetchSocialMedia());
  }, [ dispatch ]);

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

  const fetchCartFunction = useCallback(async () => {
    const payload = { authToken: verifyRes?.data?.accessToken ,refresh:verifyRes?.data?.refreshToken,type:"retail"};
    dispatch(fetchCart(payload));
  }, [ dispatch, isVerify ]);

  useEffect(() => {
    if (isVerify)
    {
      fetchCartFunction();
    }
  }, [ isVerify, fetchCartFunction ]);

  const fetchLocation = useCallback(async () => {
    try
    {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      setLocation({
        type: 'Point',
        // coordinates: [location.latitude, location.longitude],
        coordinates: [ 26.390467, 80.465796 ],
      });
    } catch (error)
    {
      console.warn(error.message);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [ fetchLocation ]);

  useEffect(() => {
    if (location && (!userLocationRes?.data || userLocationRes?.data.length === 0)) {
      dispatch(CheckUserLocation({ location }));
    }
  }, [location, userLocationRes?.data, dispatch]);

  useEffect(() => {
    if (isVerify){
      dispatch(getUserLocation({ authToken: verifyRes?.data?.accessToken }));}
  }, [ isVerify ]);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [ fetchData ]);

  const handleSearch = () => {
    console.log('Search');
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={[ 1 ]}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View>
              <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search for “Chicken Legs”"
                onPress={handleSearch}
              />
              <HomeSliderContainer />
              <View style={styles.contentContainer}>
                <AllCategoriesContainer />
                <C_Title_With_Desc
                  text_title="Combo packs"
                  text_desc="Tired, Tested, and Loved by Our Customers"
                />
                <NewCombo />
                <HomeVideoBanner />
                <C_Title_With_Desc
                  text_title="Best Sellers"
                  text_desc="Tired, Tested, and Loved by Our Customers"
                />
                <BestSellers />
                <C_Title_With_Desc text_title="Connect with Us" />
                <SocialIconContainer />
                <FeedBackContainer />
              </View>
            </View>
          )}
          ListFooterComponent={<View style={styles.footer} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        />
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  socialMediaRes: state?.socialMediaReducers,
  categoriesRes: state.categoriesReducers,
  bestSellerRes: state?.bestSellerReducers,
  bannnerRes: state?.bannnerReducers,
  comboRes: state?.comboReducers,
  userLocationRe: state?.userLocationReducers,
  cartRes: state?.cartReducer,
  verifyRes: state?.verifyReducers,
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: responsiveScreenWidth(3),
  },
  footer: {
    height: 30,
  },
});
