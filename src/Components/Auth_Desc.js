import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {FontSize, FontsWeights} from '../Themes/Fonts';

export default function Auth_Desc({
  text_title,
  text_title1,
  text_title2,
  text_color2,
  marginTop,
  onPressTextOne,
  onPressTextTwo,
}) {
  return (
    <Text style={[styles.title, marginTop && {marginTop}]}>
      <Text onPress={() => onPressTextOne()} style={[styles.textColor1]}>
        {text_title1}
      </Text>
      {text_title}
      <Text
        onPress={() => onPressTextTwo()}
        style={[styles.textColor2, {color: text_color2 || Colors.red}]}>
        {text_title2}
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: FontSize.FS14,
    textAlign: 'center',
    marginVertical: 10,
  },
  textColor1: {
    color: Colors.red,
  },
  textColor2: {
    fontWeight: FontsWeights.FW500,
  },
});
