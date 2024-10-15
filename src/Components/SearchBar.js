import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Colors from '../Themes/Colors';
import {FontSize} from '../Themes/Fonts';

const SearchBar = ({value, onChangeText, placeholder, onPress}) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={() => onPress()}>
        <Entypo name="magnifying-glass" size={25} color={Colors.black} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={() => onPress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingLeft: responsiveWidth(3),
    marginVertical: responsiveHeight(3),
    marginHorizontal:responsiveWidth(3),
    // height:responsiveHeight(5)
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS15,
    color: Colors.black,
    marginLeft: responsiveWidth(5),
  },
});

export default SearchBar;
