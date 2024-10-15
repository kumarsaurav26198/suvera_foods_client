import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Colors from '../Themes/Colors';
import {FontSize} from '../Themes/Fonts';

const InputComponent = props => {
  const {
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    maxLength,
    editable,
    multiline,
    numberOfLines,
    onBlur,
    onFocus,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}>
          <Entypo
            name={isPasswordVisible ? 'eye' : 'eye-with-line'}
            size={25}
            color={Colors.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputColor,
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS17,
    color:Colors.black
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default InputComponent;