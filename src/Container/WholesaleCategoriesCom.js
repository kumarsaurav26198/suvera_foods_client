import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

// import AllCategories from '../Components/AppComponent/AllCategories';
import C_Title_With_Desc from '../Components/C_Title_With_Desc';
import images from '../Themes/Images';
import WholesaleCom from '../Components/AppComponent/WholesaleCom';

const WholesaleCategories = () => {
  const Data = [
    {
      name: "Chicken",
      description: "Tasty and Tender",
      image:images.chicken
    },
    {
      name: "Mutton",
      description: "Rice and Flavorful",
      image:images.Mutton
    },
    {
      name: "Seafood",
      description: "Fresh from the Ocean",
      image:images.Fishs
    },
    {
      name: "Eggs",
      description: "Versatile and Nutritious",
      image:images.Eggs
    }
  ];
  return (
    <View style={styles.container}>
      <C_Title_With_Desc
        text_title="Wholesale Categories"
        text_desc="Explore Quality Cuts and Fresh Delicacies"
      />
      <FlatList
        data={Data}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={(item) => {
          return <WholesaleCom {...item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default WholesaleCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
