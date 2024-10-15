import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../Themes/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ImageSlider from '../Components/AppComponent/ImageSlider';

const ImageSliderContainer = () => {
  const sliderRef = useRef(null);

  return (
    <View style={styles.container}> 
    <SwiperFlatList
      data={[1, 1, 1, 1]}
      autoplay
      autoplayDelay={5}
      autoplayLoop
      renderItem={() => <ImageSlider />}
      showPagination
      paginationStyle={styles.pagination}
      paginationStyleItem={styles.dot}
      paginationStyleItemActive={styles.activeDot}
      paginationStyleItemInactive={styles.inactiveDot}
      dotClickEnabled
      ref={sliderRef}
    />
       </View>
  );
};

export default ImageSliderContainer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red"
    },
  pagination: {
    // bottom: responsiveHeight(-5.5),
  },
  dot: {
    backgroundColor: Colors.lightgrey,
    width: 10,
    height: 10,
  },
  activeDot: {
    backgroundColor: Colors.black,
    width: 40,
  },
  inactiveDot: {
    opacity: 0.5,
  },
});
