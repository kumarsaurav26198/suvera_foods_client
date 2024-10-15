import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import images from '../Themes/Images';

const socialData = [
  {
    _id: '66a3c74d54890343592f903d',
    name: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61563567441744',
    imageulr: images.facebook,
  },
  {
    _id: '66a3c74d54890343592f9040',
    name: 'youtube',
    url: 'https://youtube.com/@suverakitchen?si=dnmew6NHMF5dRK5Q',
    imageulr: images.youtube,
  },
  {
    _id: '66a3c74d54890343592f903f',
    name: 'instagram',
    url: 'https://www.instagram.com/suverafoods/',
    imageulr: images.instagram,
  },
  {
    _id: '66a3c74d54890343592f903e',
    name: 'x',
    url: 'https://x.com/suverafoods',
    imageulr: images.twitter,
  },
];

function SocialIconContainer({socialMediaRes}) {
  const renderSocialIcon = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.7}   onPress={() => Linking.openURL(item.url)}>
        <Image source={item.imageulr} style={styles.socialIcon} />
      </TouchableOpacity>
    );
  };

  const data = socialMediaRes ? socialMediaRes?.socialMedia : socialData;

  return (
    <View style={styles.container}>
      <FlatList
        data={socialData}
        showsHorizontalScrollIndicator={false}
        renderItem={renderSocialIcon}
        keyExtractor={item => item._id}
        horizontal={true}
        contentContainerStyle={styles.iconContainer}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  socialMediaRes: state.socialMediaReducers?.data,
});
export default connect(mapStateToProps)(SocialIconContainer);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: {
    height: 50,
    width: 50,
    marginRight: 50,
  },
});
