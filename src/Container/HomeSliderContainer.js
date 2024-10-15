import React, { useRef } from 'react';
import { StyleSheet, View, } from 'react-native';
import SliderCard from '../Components/AppComponent/SliderCard';
import Colors from '../Themes/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { isTablet } from '../Themes/DeviceUtils';
import { connect } from 'react-redux';

const HomeSliderContainer = ({bannnerRes}) => {
  // console.log("bannnerRes",bannnerRes)
  const sliderRef = useRef(null);
  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={bannnerRes||[]}
        autoplay
        autoplayDelay={5}
        autoplayLoop
        renderItem={(item) => {
          return (<SliderCard {...item} />);
        }}
        showPagination
        paginationStyle={isTablet() ? styles.paginationTablet : styles.pagination}
        paginationStyleItem={styles.dot}
        paginationStyleItemActive={styles.activeDot}
        paginationStyleItemInactive={styles.inactiveDot}
        dotClickEnabled={true}
        ref={sliderRef}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  bannnerRes: state.bannnerReducers?.data?.banner,
  verifyRes: state?.verifyReducers?.data?.authToken,
});

export default connect(mapStateToProps)(HomeSliderContainer);


const styles = StyleSheet.create({
  container: {
    height: 180,
  },
  pagination: {
    bottom: -10,
  },
  paginationTablet: {
    bottom: -46,
  },
  dot: {
    backgroundColor: Colors.lightgrey,
    width: 8,
    height: 8,
  },
  activeDot: {
    backgroundColor: Colors.black,
    width: 30,
  },
  inactiveDot: {
    opacity: 0.5,
  },
});
