import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Themes/Colors';  

const C_DropDown = ({ listData, onValueChange, initialValue, placeholder }) => {
  const [value, setValue] = useState(initialValue || null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={listData}
        maxHeight={200}  
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        dropdownPosition="top"  // Ensures the dropdown tries to open downwards
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onValueChange(item.value);  
        }}
        renderRightIcon={() => <Icon name="arrow-drop-down" size={20} color={Colors.black} />}
      />
    </View>
  );
};

export default C_DropDown;

const styles = StyleSheet.create({
  container: {
    height: 35,  
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    minWidth: 150,
    borderRadius: 7,
    overflow: "hidden"
  },
  dropdown: {
    height: 35, 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,  
    justifyContent: 'center',
    borderRadius: 7,
    overflow: "hidden"
  },
  placeholderStyle: {
    fontSize: 14,  
    textAlign: 'center',
    color: '#000',
    fontWeight: "500"
  },
  selectedTextStyle: {
    fontSize: 14, 
    textAlign: 'center',
    color: '#000',
    fontWeight: "500"
  },
  iconStyle: {
    width: 16,  
    height: 16,
  },
  inputSearchStyle: {
    fontSize: 14,  
    textAlign: 'center',
    color: '#000',
    fontWeight: "500"
  },
});
