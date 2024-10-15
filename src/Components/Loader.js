import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={styles.centeredView}>
     <ActivityIndicator size="small" />
      {/* <LottieView
        style={styles.lottieView}
        source={require('../Assets/animations/Loader.json')}
        autoPlay
        loop
      /> */}
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // backgroundColor: 'rgba(0,0,0,0.9)',
  },
  lottieView: {
    height: 250,
    width: 250
  },
});
