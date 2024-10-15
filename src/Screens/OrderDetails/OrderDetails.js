import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../Components/AppComponent/AppHeader';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import images from '../../Themes/Images';
import C_Button from '../../Components/C_Button';

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <AppHeader text={'Order Details'} />
            <View style={styles.orderr}>
              <Text style={styles.infoDesc}>Order ID</Text>
              <Text style={[styles.infoDesc, styles.infoDes2]}>
                OD34523519052710001KNP
              </Text>
            </View>

            <View style={styles.billContainer}>
              <Text style={styles.cartTitle}>Order Info</Text>
              <View style={styles.rowBetween}>
                <View>
                  <View style={styles.flexRow}>
                    <Text style={styles.billText}>Order Date: </Text>
                    <Text style={[styles.infoDesc, styles.infoDes2]}>300</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.billText}>Order Time: </Text>
                    <Text style={[styles.infoDesc, styles.infoDes2]}>300</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.billText}>Payment Mode: </Text>
                    <Text style={[styles.infoDesc, styles.infoDes2]}>300</Text>
                  </View>
                </View>

                <Image source={images.chickenSlice} style={styles.imageStyle} />
              </View>
            </View>
            <View style={styles.billContainer}>
              <Text style={styles.cartTitle}>Items to Pack</Text>
              <View style={styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                  <Image
                    source={images.chickenSlice}
                    style={styles.itemImage}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    Farm Fresh Dressed Chicken Legs
                  </Text>
                  <Text style={styles.itemWeight}>Kg'</Text>
                  <Text />
                </View>
              </View>
            </View>
            <View style={styles.orderr}>
                <View>
                <Text style={styles.infoDesc}>Total Items :</Text>
                <Text style={[styles.infoDesc, styles.infoDes2]}>4</Text>
                </View>
                <View>
                <Text style={styles.infoDesc}>Paid amount :</Text>
                <Text style={[styles.infoDesc, styles.infoDes2]}>₹ 1456 </Text>
                </View>
            
            </View>
            <View style={{width:"90%", alignSelf:"center"}}>

            <C_Button title="Reorder"/>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  orderr: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: Colors.white,
    padding: 15,
    marginBottom: 10,
  },
  infoDesc: {
    color: Colors.gray,
    fontSize: FontSize.FS14,
  },
  infoDes2: {
    color: Colors.black,
    fontSize: FontSize.FS14,
    left: 20,
    fontWeight: FontsWeights.FW600,
  },
  cartTitle: {
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  billContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billText: {
    color: Colors.black,
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  itemImageContainer: {
    backgroundColor: Colors.bgGreen,
    width: Dimensions.get('screen').width * 0.2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  itemDetails: {
    // width: Dimensions.get('screen').width * 0.43,
  },
  itemQuantity: {
    width: Dimensions.get('screen').width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemName: {
    fontSize: FontSize.FS12,
    color: Colors.black,
  },
  itemName: {
    fontSize: FontSize.FS12,
    color: Colors.black,
  },
  itemWeight: {
    fontSize: FontSize.FS12,
    color: Colors.green,
    fontWeight: FontsWeights.FW600,
  },
  itemPrice: {
    color: Colors.black,
    fontWeight: FontsWeights.FW600,
  },
});
