import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import {FontSize, FontsWeights} from '../../Themes/Fonts';
import {
  ProfileImg,
  Edit,
  Clipboard,
  Location,
  Info,
  Help,
  Bell,
  Logout,
} from '../../Assets/svg';
import {connect, useDispatch} from 'react-redux';
import {fetchUserProfile, logOut} from '../../Redux/Actions/AuthActions';

const Account = ({navigation, verifyRes,userProfileRes}) => {

  const show = !!(verifyRes?.data?.accessToken || verifyRes?.data?.refreshToken);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchUserProfileFunction = useCallback(async () => {
    const payload = { authToken: verifyRes.data?.authToken };
    dispatch(fetchUserProfile(payload)); 
  }, [dispatch, verifyRes]);

  useEffect(() => {
    if (isFocused && verifyRes.data?.authToken) {
      fetchUserProfileFunction(); 
    }
  }, [isFocused, verifyRes, fetchUserProfileFunction]);

  const handleLogout = () => {
    setModalVisible(true);
  };
  const handleLogIn = () => {
    navigation.navigate('SignIn',{fromScreen: 'Account'});
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  const handleAddress = () => {
    navigation.navigate('DefaultAddress');
  };
  const handleOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };
  const handleSupportFAQ = () => {
    navigation.navigate('SupportFAQ');
  };
  const handleNotification = () => {
    navigation.navigate('Notification');
  };

  const MenuItem = ({IconComponent, title, onPress}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <IconComponent style={styles.icon} />
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={35} color={Colors.black} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          show?<View style={styles.profileInfo}>
          <View>
            <Text style={styles.name}>{userProfileRes?.name}</Text>
            <Text style={styles.info}>{userProfileRes?.phoneNumber}</Text>
            <Text style={styles.info}>{userProfileRes?.email}</Text>
          </View>
          <ProfileImg />
        </View>:null
        }
        
        <View style={styles.menu}>
          {
            show?<>
             <MenuItem
            IconComponent={Edit}
            title="Change Password"
            onPress={handleEditProfile}
          />
          <MenuItem
            IconComponent={Clipboard}
            title="Your Orders"
            onPress={handleOrderHistory}
          />
          <MenuItem
            IconComponent={Location}
            title="Address"
            onPress={handleAddress}
          />
            </>:null
          }
         
          <MenuItem
            IconComponent={Info}
            title="About Us"
            onPress={handleAboutUs}
          />
          <MenuItem
            IconComponent={Help}
            title="Support & FAQ"
            onPress={handleSupportFAQ}
          />
          <MenuItem
            IconComponent={Bell}
            title="Notification"
            onPress={handleNotification}
          />
          {show ? (
            <MenuItem
              IconComponent={Logout}
              title="Logout"
              onPress={handleLogout}
            />
          ) : <MenuItem
          IconComponent={Logout}
          title="Log in"
          onPress={handleLogIn}
        />}
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon name="cross" size={30} color={Colors.black} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Log out?</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  dispatch(logOut());
                  navigation.navigate('Home');
                }}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, {color: Colors.black}]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  userProfileRes: state?.userProfileReducers?.data?.user,
});
export default connect(mapStateToProps)(Account);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
  },
  profileImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
    marginRight: responsiveWidth(3),
  },
  name: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    marginBottom: responsiveHeight(1),
    color: Colors.black,
  },
  info: {
    fontSize: FontSize.FS14,
    color: Colors.gray,
    fontWeight: FontsWeights.FW400,
  },
  menu: {
    marginTop: responsiveHeight(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
  },
  menuItemText: {
    fontSize: FontSize.FS18,
    marginLeft: responsiveWidth(3),
    color: Colors.black,
  },
  icon: {
    width: 24,
    height: 24,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: responsiveWidth(80),
    padding: responsiveWidth(5),
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW400,
    marginVertical: responsiveHeight(2),
    color: Colors.black,
  },
  modalButtonText: {
    fontSize: FontSize.FS18,
    color: Colors.red,
    fontWeight: FontsWeights.FW500,
    borderTopColor: Colors.lightgrey,
  },
  modalButton: {
    borderTopColor: Colors.lightgrey,
    borderTopWidth: 1,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
});
