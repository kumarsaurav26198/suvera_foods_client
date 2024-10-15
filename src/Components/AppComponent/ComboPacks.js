
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import C_Title_With_Desc from '../C_Title_With_Desc';
import { useNavigation } from '@react-navigation/native';

const data = Array(6).fill({
  title: "Freshly Cut Salmon Fish",
  weight: "2kg",
  quantity: "1-5",
  cookingTime: "5-12",
  price: "₹679",
  originalPrice: "₹820",
  discount: "20% OFF"
});

const ComboPacks = ({Premium=false}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.detailsContainer}  onPress={() => navigation.navigate('ProductsDescription',{Premium:Premium})}>
      <View style={styles.imageContainer}>
        <Image source={images.Fish} style={styles.image} />
      </View>
      <View style={styles.productDetailsWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
          <Text numberOfLines={1} style={[styles.infoText,{width:50}]}>Chicken :</Text>
          </View>
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
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
          <Text numberOfLines={1} style={[styles.infoText,{width:50}]}>Fish :</Text>
          </View>
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
        horizontal={true}
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
    backgroundColor: 'lightgrey'
  },
  imageContainer: {
    height: responsiveHeight(18),
    backgroundColor: Colors.pale_green,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30
  },
  image: {
    width: responsiveWidth(30),
    height: responsiveHeight(10),
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginHorizontal: responsiveWidth(2),
    width: responsiveWidth(60),
    marginTop:responsiveHeight(3)
    
  },
  title: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW600,
    color:Colors.black
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(2)
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  infoText: {
    color: Colors.gray,
    fontSize: FontSize.FS12
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: FontSize.FS15,
    fontWeight: FontsWeights.FW800,
    color: Colors.black
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: responsiveWidth(8),
    borderRadius: 5,
    paddingVertical: responsiveHeight(1)
  },
  addButtonText: {
    color: 'white',
    fontSize: FontSize.FS15,
    fontWeight: FontsWeights.FW600
  },
  originalPrice: {
    color: Colors.gray,
    fontSize: FontSize.FS12,
    textDecorationLine: 'line-through'
  },
  discount: {
    fontSize: FontSize.FS10,
    color: Colors.lightgreen,
    fontWeight: FontsWeights.FW700,
    marginLeft: responsiveWidth(2)
  },
  productDetailsWrapper: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4)
  }
});

export default ComboPacks;
