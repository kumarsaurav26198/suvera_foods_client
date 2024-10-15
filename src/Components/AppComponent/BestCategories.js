import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const data = Array(6).fill({
  title: 'Freshly Cut Salmon Fish',
  weight: '2kg',
  quantity: '1-5',
  cookingTime: '5-12',
  price: '₹679',
  originalPrice: '₹820',
  discount: '20% OFF',
});

const BestCategories = ({Premium=false, _doc}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.detailsContainer}
      onPress={() => navigation.navigate('ProductsDescription',{Premium:Premium})}>
      <View style={styles.imageContainer}>
        <Image source={images.chicken} style={styles.image} />
      </View>
      <View style={styles.productDetailsWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Image source={images.quantity} style={styles.icon} />
            <Text style={styles.infoText}>{item.weight}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={images.hand} style={styles.icon} />
            <Text style={styles.infoText}>{item.quantity}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={images.panIcon} style={styles.icon} />
            <Text style={styles.infoText}>{item.cookingTime}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.infoItem}>
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              <Text style={styles.discount}>{item.discount}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        key={2}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'lightgrey',
  },

  imageContainer: {
    height: responsiveHeight(13),
    backgroundColor: Colors.pale_green,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
  },
  image: {
    // width: responsiveWidth(22),
    // height: responsiveHeight(10),
    // resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: responsiveWidth(1.5),
    width: responsiveWidth(44),
    marginTop: responsiveHeight(3.5),
    borderColor: Colors.lightgrey,
    borderWidth: 0.5,
  },
  title: {
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW500,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  infoText: {
    color: Colors.gray,
    fontSize: FontSize.FS12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: FontSize.FS13,
    fontWeight: FontsWeights.FW800,
    color: Colors.black,
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 5,
    paddingVertical: responsiveHeight(1),
  },
  addButtonText: {
    color: 'white',
    fontSize: FontSize.FS13,
    fontWeight: FontsWeights.FW600,
  },
  originalPrice: {
    color: Colors.gray,
    fontSize: FontSize.FS11,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: FontSize.FS10,
    color: Colors.lightgreen,
    fontWeight: FontsWeights.FW700,
    marginLeft: responsiveWidth(1),
  },
  productDetailsWrapper: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
  },
});

export default BestCategories;
