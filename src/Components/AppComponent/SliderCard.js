import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import image from '../../Themes/Images';
import C_Button from '../C_Button';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';

const SliderCard = (props) => {
  const{images,videoLink,buttonLink}=props

  return (
    <ImageBackground source={image.CardBg} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text numberOfLines={3} style={styles.headerTextRed}>
            Limited{' '}
            <Text style={styles.headerTextWhite}>
              Time Offer: 50% Off on Mutton!
            </Text>
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.description}>
          This is the description of the slider card. It provides more details
          about the content.
        </Text>
        <View style={{width: 150}}>
          <C_Button title="Shop Now"  fontWeight={FontsWeights.FW700} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SliderCard;

const styles = StyleSheet.create({
  card: {
    width: responsiveWidth(94),
    height:155,
    alignContent:"center",
    borderRadius: 15,
    overflow: 'hidden',
    resizeMode:"cover",
    marginHorizontal: responsiveWidth(3),
  },
  content: {
    width: '82%',
    padding: responsiveWidth(2),
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    width: '65%',
  },
  headerTextRed: {
    color: Colors.red,
    fontSize:FontSize.FS20,
    fontWeight: FontsWeights.FW700,
  },
  headerTextWhite: {
    color: Colors.white,
  },
  description: {
    color: Colors.white,
    fontSize: FontSize.FS14,
    fontWeight:FontsWeights.FW500,
  },
});
