import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import images from '../../Themes/Images';

const ImageSlider = ({data}) => {
  return (
    <View style={styles.container}>
    {data && data.length > 0 ? (
      <Image source={{ uri: data[0] }} style={styles.card} />
    ) : (
      <Image source={images.chickenSlice} style={styles.card} />
    )}
  </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: 300,
    // paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: 'hidden',
    backgroundColor: "#038A1126",
    marginBottom:10
  },
  card: {
    width: "100%",
    height: 250,
    // borderRadius:110,
    // borderBottomEndRadius: 15,
    // borderBottomLeftRadius: 15,
  },
});
