import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import HomeSliderContainer from '../../Container/HomeSliderContainer';
import SearchBar from '../../Components/SearchBar';
import HomeHeader from '../../Components/AppComponent/HomeHeader';
import BestSellers from '../../Components/AppComponent/BestsellersComponent';
import HomeVideoBanner from '../../Components/AppComponent/HomeVideoBanner';
import FeedBackContainer from '../../Container/FeedBackContainer';
import C_Title_With_Desc from '../../Components/C_Title_With_Desc';
import SocialIconContainer from '../../Components/SocialIconContainer';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import WholesaleCategories from '../../Container/WholesaleCategoriesCom';

export default function Wholesale() {
  const [serachText, setSearchText] = useState();

  const handleSearch = () => {
    console.log('Search');
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <View>
              <SearchBar
                value={serachText}
                onChangeText={text => setSearchText(text)}
                placeholder="Search for “Chicken Legs”"
                onPress={() => handleSearch()}
              />
              <HomeSliderContainer />
              <View style={{ paddingHorizontal: responsiveScreenWidth(3),}}>
                <WholesaleCategories />
                <C_Title_With_Desc
                  text_title="Best Sellers"
                  text_desc="Tired,Tested, and Loved by Our Customers"
                />
                <BestSellers />
                <HomeVideoBanner />
                <C_Title_With_Desc
                  text_title="Connect with Us"
                />
                <SocialIconContainer />
                <FeedBackContainer />
              </View>
            </View>
          );
        }}
        ListFooterComponent={<View style={{height: 30}} />}
      />
    </View>
  );
}
