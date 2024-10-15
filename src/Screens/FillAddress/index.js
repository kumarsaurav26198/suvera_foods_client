import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import InputComponent from '../../Components/InputComponent';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';

const FillAddress = () => {
  const bottomSheetRef = useRef(null);
  
  const handleSheetChanges = (index) => {
    console.log('handleSheetChanges', index);
  };

  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={['40%', '80%']} 
    >
      <BottomSheetView style={styles.bottomSheet}>
        <InputComponent placeholder="Enter your house/flat number" label='House / Flat Number' />
        <InputComponent placeholder="Enter your street address" label='Street Address' />
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <InputComponent placeholder="LandMark" label='LandMark' />
          </View>
          <View style={styles.halfInput}>
            <InputComponent placeholder="Your Area" label='Area / Locality' />
          </View>
        </View>
        <View style={styles.handle} />
        <Text style={styles.addressLabel}>Address Type</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.labelButton}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton}>
            <Text style={styles.buttonText}>Office</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.labelButton, styles.selectedLabelButton]}>
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
        <C_Button
          title="Save Address"
          backgroundColor={Colors.black}
          text_color={Colors.white}
        />
      </BottomSheetView>
    </BottomSheet>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text>MapView</Text>
      </View>
      {renderBottomSheet()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.white,
    borderTopLeftRadius: responsiveWidth(3),
    borderTopRightRadius: responsiveWidth(3),
  },
  handle: {
    height: 1,
    backgroundColor: Colors.lightgrey,
    marginVertical: responsiveHeight(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '45%',
  },
  addressLabel: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.black
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    width: responsiveWidth(60),
    marginBottom: responsiveHeight(2)
  },
  labelButton: {
    backgroundColor: Colors.black,
    borderRadius: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.7),
    paddingHorizontal: responsiveWidth(4),
  },
  selectedLabelButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.FS13,
    fontWeight: FontsWeights.FW600,
  },
});

export default FillAddress;
