import {StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {FontSize, FontsFamilies, FontsWeights} from '../Themes/Fonts';

function C_Button(props) {
  const {
    onPress,
    title,
    backgroundColor,
    text_color,
    disabled,
    font_Weight,
    font_Family,
    font_Size,
    borderColor,
    loading
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.65}
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor && {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ]}>
        {loading ? (
        <ActivityIndicator size="small" color={text_color ? text_color : Colors.black} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: text_color ? text_color : Colors.black,
              fontWeight: font_Weight ? font_Weight : FontsWeights.FW600,
              fontFamily: font_Family ? font_Family : FontsFamilies.regular,
              fontSize: font_Size ? font_Size : FontSize.FS16,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.6,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    minWidth:130
  },
  text: {
    textAlign: 'center'
  },
});
export default C_Button;
