import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';


const SetLocationMap = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <Text>MapView</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.locationText}>Armapur Estate</Text>
        <Text style={styles.subText}>Current Location</Text>
        <C_Button
          title="Confirm & Fill Details"
          backgroundColor={Colors.black}
          text_color={Colors.white}
          onPress={() => { navigation.navigate("FillAddress"); }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,

  },
  bottomContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    // backgroundColor:Colors.lightgrey
  },
  locationText: {
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
    color: Colors.black
  },
  subText: {
    fontSize: FontSize.FS12,
    color: Colors.gray,
    marginTop: responsiveHeight(1),
  },

});

export default SetLocationMap;
