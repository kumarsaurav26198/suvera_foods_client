import {Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {FontSize, FontsWeights} from '../Themes/Fonts';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function Auth_Title(props) {
  const {red_Text, text_title} = props;

  return (
    <Text style={styles.title}>
      <Text style={styles.redText}>{red_Text}</Text>
      {text_title}
    </Text>
  );
}
const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: FontSize.FS24,
    fontWeight: FontsWeights.FW700,
    width: responsiveWidth(90),
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },
  redText: {
    color: Colors.red,
  },
});
