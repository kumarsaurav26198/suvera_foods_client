import {Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {FontSize, FontsWeights} from '../Themes/Fonts';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function C_Title_With_Desc(props) {
  const {text_title, text_desc, style} = props;

  return (
    <>
      <Text style={[styles.text_title, style]}>{text_title}</Text>
      {text_desc ? <Text style={styles.text_desc}>{text_desc}</Text> : null}
    </>
  );
}
const styles = StyleSheet.create({
  text_title: {
    color: Colors.black,
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW500,
    width: responsiveWidth(90),
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(2),
    marginBottom: responsiveHeight(0.5),
  },
  text_desc: {
    color: Colors.gray,
    marginBottom: responsiveHeight(2.2),
    fontSize: FontSize.FS13,
  },
});
