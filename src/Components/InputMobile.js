import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from '../Themes/Colors';

const InputMobile = props => {
  const {placeholder, onChangeText, value, onCountryChange} = props;
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');

  const handleSelectCountry = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    if (onCountryChange) {
      onCountryChange(country.callingCode[0]);
    }
  };

  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(callingCode);
    }
  }, [callingCode, onCountryChange]);

  return (
    <View style={styles.container}>
      <CountryPicker
        withCallingCodeButton={true}
        withFilter={true}
        withAlphaFilter={true}
        withCallingCode={true}
        withFlag={true}
        onSelect={handleSelectCountry}
        countryCode={countryCode}
        containerButtonStyle={styles.countryPicker}
      />
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"gray"}
        placeholder={placeholder ? placeholder : `+${callingCode}`}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default InputMobile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputColor,
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    marginVertical: 10,
  },
  countryPicker: {
    // marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});