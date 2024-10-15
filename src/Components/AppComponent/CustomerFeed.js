import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../../Themes/Images';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';

const CustomerFeed = () => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.description} numberOfLines={7}>
            “ Suvera Foods has transformed the way we buy meat. The freshness and quality are exceptional, and the delivery is always prompt. It’s become a household name for us! “
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.namePlaceContainer}>
            <Text style={styles.nameText}>Rajesh K</Text>
            <Text style={styles.placeText} numberOfLines={2}>Mumbai, Maharashtra</Text>
          </View>
          <View style={styles.circle}>
            <Image source={images.Quotes} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: responsiveWidth(42), 
    alignItems: 'flex-start',
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    // borderWidth: 0.1,
    marginTop: 15,
    marginRight: responsiveWidth(5),
  },
  content: {
    padding: responsiveWidth(2), // Adjusted padding
  },
  header: {
    width: '100%',
    marginBottom: 20,
  },
  description: {
    color: Colors.gray,
    fontSize: FontSize.FS14,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  namePlaceContainer: {
    width: 100,
  },
  nameText: {
    color: Colors.black,
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW500,
  },
  placeText: {
    color: Colors.gray,
    fontSize: FontSize.FS12,
  },
  circle: {
    height: 100,
    width: 100,
    backgroundColor: 'black',
    borderRadius: 50,
    position: "absolute",
    left: 100,
    top: -10,
  },
  image: {
    height: 30,
    width: 30,
    left: 20,
    top: 25,
  },
});

export default CustomerFeed;
