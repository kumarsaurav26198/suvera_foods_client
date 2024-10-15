import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import images from '../../Themes/Images';
import {useNavigation} from '@react-navigation/native';


export default function OrderCom() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={images.chickenSlice}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>Farm Fresh Dressed Chicken Legs</Text>
          <Text style={styles.quantity}>2KG</Text>
          <Text style={styles.price}>850</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("OrderDetails")}}>
          <Text style={styles.buttonText}>View Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: "#fff",
      shadowColor: '#000', // Black shadow
      shadowOffset: { width: 0, height: 2 }, // Shadow positioning
      shadowOpacity: 0.2, // Shadow opacity
      shadowRadius: 4, 
      elevation: 5,
      marginBottom:10
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000', // Black shadow
      shadowOffset: { width: 0, height: 2 }, // Shadow positioning
      shadowOpacity: 0.2, // Shadow opacity
      shadowRadius: 4, // Shadow blur radius
  
      // Shadow for Android
    },
    image: {
      width: 60,
      height: 60,
      marginRight: 16,  // Spacing between image and details
      backgroundColor: Colors.bgGreen,
      padding: 10, // This adds padding inside the image container
    },
    details: {
      flex: 1,
    },
    title: {
      fontSize: FontSize.FS13,
      fontWeight: FontsWeights.FW600,
      marginBottom: 4,
      color: Colors.black,
    },
    quantity: {
      fontSize: 14,
      fontWeight: FontsWeights.FW600,
      color: '#4CAF50',
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.black,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 12,
      alignItems: 'center',
      borderWidth: 0.8,
    },
    buttonText: {
      fontSize: FontSize.FS14,
      fontWeight: FontsWeights.FW500,
      color: Colors.black,
    },
  });
  