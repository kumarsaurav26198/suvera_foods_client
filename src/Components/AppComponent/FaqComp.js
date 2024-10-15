import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Themes/Colors';
import { DownArrow } from '../../Assets/svg';

const FaqComp = props => {
  const { header, title } = props;
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
        <TouchableOpacity onPress={toggleTextVisibility}>
          <View style={isTextVisible ? styles.rotatedIcon : styles.icon}>
            <DownArrow  />
          </View>
        </TouchableOpacity>
      </View>
      {isTextVisible && (
        <View style={styles.content}>
          <Text style={styles.contentText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default FaqComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom:15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    width:"85%"
  },
  content: {
    borderTopWidth: 0.5,
    paddingVertical: 10,
    borderTopColor: 'gray',
  },
  contentText: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  rotatedIcon: {
    transform: [{ rotate: '180deg' }],
  },
});
