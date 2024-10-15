import React from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../Themes/Images';
import Colors from '../Themes/Colors';
import { FontSize, FontsWeights } from '../Themes/Fonts';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const NewCombo = (props) => {
  // console.log(" NewCombo item===>>",JSON.stringify(props,null,2))

  const {bannerImage,name,title,_id}=props

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate("ComboDetails",{Comboid:_id})}}>
      <View style={styles.header}>
        <View style={styles.letf}>
          <Text style={styles.headerTextCombo}>
            SUPER <Text style={{ color: '#faaf6b' }}>COMBO</Text>
          </Text>
        </View>
        <View  style={styles.headerIconContainer}>
          <View style={{width:30, height:30,backgroundColor:"#faaf6b", borderRadius:15,borderWidth:1,padding:1}}></View>
        <Text style={styles.headerTextSmall}>Limited Time Offer</Text>
        </View>
      </View>
      {
        bannerImage? <ImageBackground source={{uri:bannerImage}} style={styles.backgroundImage}>
        {/* <Text style={styles.comboTitle}>{title}</Text> */}
      </ImageBackground>: <ImageBackground source={images.chickenSlice} style={styles.backgroundImage}>
        {/* <Text style={styles.comboTitle}>{title}</Text> */}
      </ImageBackground>
      }
     
    </TouchableOpacity>
  );
};
const ComboList = ({comboRes}) => {
  const renderItem =({item})=>{
    return( <NewCombo {...item} />)
  };

  return (
    <FlatList
      data={comboRes}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id} 
      contentContainerStyle={styles.listContainer} 
    />
  );
};

const mapStateToProps = state => ({
  comboRes: state.comboReducers?.data,
  verifyRes: state?.verifyReducers?.data?.authToken,
});

export default connect(mapStateToProps)(ComboList);


const styles = StyleSheet.create({
  listContainer: {
    padding: responsiveWidth(2),
  },
  card: {
    width: 350,
    height: 225,
    borderRadius: 15,
    overflow: 'hidden',
    // backgroundColor: Colors.white,
    backgroundColor: "#038A1126",
    marginBottom: 10,
    marginRight:15
    // paddingRight:22
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
    backgroundColor: "#038A1126",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align left icon and right text
    padding: responsiveWidth(2),
    backgroundColor: "#fff",
    zIndex: 1, // Ensure the header stays above the background image
  },
  headerIconContainer: {
    alignItems: 'center',
  },
  headerTextCombo: {
    fontSize: FontSize.FS25,
    color: Colors.red,
    fontWeight: FontsWeights.FW800,
  },
  headerTextSmall: {
    fontSize: FontSize.FS8,
    color: Colors.black,
    fontWeight: FontsWeights.FW600,
  },
  comboTitle: {
    // position: 'absolute',
    bottom: 10,
    left: 10,
    color: Colors.black,
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
  },
});
