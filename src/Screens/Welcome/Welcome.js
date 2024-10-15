import {View, Text, StyleSheet, ImageBackground, Platform} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import images from '../../Themes/Images';

export default function Welcome() {
  return (
    <ImageBackground source={images.welcomeBG} style={styles.container}>
      <View style={styles.parentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            Suvera<Text style={styles.foodText}> Foods</Text>
          </Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.text}>
            Fresh meat and eggs, delivered to your door. Order now!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  parentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(2),
  },
  text: {
    color: Colors.white,
    fontWeight: FontsWeights.FW900,
    fontSize: FontSize.FS30,
    width: responsiveWidth(62),
    marginBottom: responsiveHeight(5),
  },
  middleContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(2),
    borderRadius: 25,
    width: responsiveWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Platform.OS === 'ios' ? responsiveHeight(4) : null,
  },
  logoText: {
    color: Colors.error,
    fontSize: FontSize.FS22,
    fontWeight: FontsWeights.FW900,
  },
  foodText: {
    color: Colors.black,
  },
});
