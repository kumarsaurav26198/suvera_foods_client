import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';
import {useNavigation} from '@react-navigation/native';

const WholesaleCom = props => {
  const {name, description, image,_id} = props.item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Categories',{categoryId:_id})}>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.headerTextWhite}>
          {name}
        </Text>
        <View style={styles.header}>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.circle}>
        <Image source={image} style={styles.imag} />
      </View>
    </TouchableOpacity>
  );
};

export default WholesaleCom;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: responsiveHeight(14),
    alignItems: 'flex-start',
    borderRadius: 8,
    overflow: 'hidden',
    resizeMode: 'cover',
    backgroundColor: Colors.white,
    marginBottom: 15,
  },
  content: {
    padding: responsiveWidth(2),
  },
  header: {
    width: '70%',
  },
  headerTextWhite: {
    color: Colors.black,
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
  },
  description: {
    color: Colors.gray,
    fontSize: FontSize.FS14,
  },
  circle: {
    height: 90,
    width: 90,
    backgroundColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    right: -20,
    top: 50,
    justifyContent: 'center',
  },
  imag: {
    height: 35,
    width: 50,
    left: 14,
    bottom: 20,
  },
});
