import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';

const items = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Dressed' },
  { id: '3', name: 'Boneless' },
  { id: '4', name: 'Mince' },
  { id: '5', name: 'Breast' },
];

const ListItem = ({ item, onPress, isSelected }) => (
  <TouchableOpacity
    style={[styles.itemContainer, isSelected && styles.selectedItem]}
    onPress={onPress}
  >
    <Text style={[styles.itemText, isSelected && styles.selectedText]}>{item.name}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(items[0].id);

  const handlePress = (id) => {
    setSelectedId(id);
  };

  return (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => handlePress(item.id)}
            isSelected={item.id === selectedId}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

  );
};

const styles = StyleSheet.create({

  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:responsiveWidth(1),
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius: 18,
    backgroundColor:Colors.white,
    borderColor:Colors.lightgrey,
    borderWidth: 1,
    height:responsiveHeight(5)
  },
  itemText: {
    fontSize:FontSize.FS14,
    color: Colors.black,
    fontWeight:FontsWeights.FW600,
    paddingHorizontal:10
  },
  selectedItem: {
    backgroundColor:Colors.black,
  },
  selectedText: {
    color:Colors.white,
    fontSize:FontSize.FS15,
    fontWeight:FontsWeights.FW700,
  },
});

export default App;
