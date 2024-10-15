import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import { useRoute } from '@react-navigation/native';

const SavedAddresses = ({navigation}) => {
  const route = useRoute();
  const { fromScreen, productPrice } = route?.params;
  const addresses = [
    {
      id: '1',
      title: 'Current Delivery Address',
      address: '123, Rajouri Garden, New Delhi,110027, India',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.locationContainer}>
        <View style={styles.locationTextContainer}>
          <Image source={images.map} />
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Location</Text>
            <Text style={styles.locationSubtitle}>using GPS</Text>
          </View>
        </View>
        <View style={styles.viewLeft}>
          <Icon name="navigation" size={responsiveHeight(3)} color={Colors.black} />

        </View>
      </TouchableOpacity>
      <Text style={styles.savedAddressesTitle}>Saved Addresses</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationContainer}>
            <View style={styles.addressTextContainer}>
              <Image source={images.map} />
              <View style={styles.addressText}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressSubtitle}>{item.address}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewLeft}>
              <MaterialIcon name="edit" size={responsiveHeight(3)} color={Colors.darkgrey} />
            </TouchableOpacity>
          </View>
        )}
      />
      <C_Button
        title="+ Add New Address"
        backgroundColor={Colors.black}
        text_color={Colors.white}
        // onPress={()=>{navigation.navigate("SetLocationMap")}}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },

  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: responsiveHeight(10),
    borderRadius: responsiveHeight(1),
    marginVertical: responsiveHeight(4),
    borderColor: Colors.lightgrey,
    borderWidth: 1,
    paddingLeft: responsiveWidth(2)
  },
  locationTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: responsiveWidth(2),
    bottom: responsiveHeight(1)
  },
  locationTitle: {
    fontSize: FontSize.FS15,
    fontWeight: FontsWeights.FW600,
    color: Colors.black
  },
  locationSubtitle: {
    fontSize: FontSize.FS12,
    color: Colors.blue,
  },
  savedAddressesTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },

  addressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: responsiveWidth(2),
  },
  addressTitle: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: Colors.blue,
    marginBottom: responsiveHeight(1)
  },
  addressSubtitle: {
    fontSize: FontSize.FS11,
    color: Colors.gray,
    width: responsiveWidth(55),

  },
  viewLeft: {
    marginRight: responsiveWidth(5)
  }
});

export default SavedAddresses;
