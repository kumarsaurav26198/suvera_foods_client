import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontSize, FontsFamilies, FontsWeights} from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Arrow_Button(props) {
  const {
    onPress,
    title,
    backgroundColor,
    text_color,
    disabled,
    font_Weight,
    font_Family,
    font_Size,
    itemCount,
    price,
  } = props;

  const textStyle = {
    color: text_color || Colors.white,
    fontWeight: font_Weight || FontsWeights.FW600,
    fontFamily: font_Family || FontsFamilies.regular,
    fontSize: font_Size || FontSize.FS16,
    paddingHorizontal: 10,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.65}
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor && {
          backgroundColor,
          borderColor: backgroundColor,
        },
      ]}>
      <View style={styles.textContainer}>
        <View style={styles.textGroup}>
          <Text
            style={[
              textStyle,
              styles.borderedText,
              {borderRightWidth: 1, borderRightColor: Colors.white},
            ]}>
            {itemCount}
            {' items'}
          </Text>
          <Text style={textStyle}>
            {'₹'}
            {price}
          </Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={[textStyle, styles.borderedText]}>{title}</Text>
          <AntDesign name={'arrowright'} size={22} color={Colors.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.gray,
    backgroundColor: Colors.black,
    width: '94%',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderedText: {
    paddingVertical: 5,
    fontWeight: FontsWeights.FW600,
  },
});

export default Arrow_Button;
