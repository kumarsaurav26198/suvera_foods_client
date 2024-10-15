import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { FontSize } from '../../Themes/Fonts';
import ModalComponent from '../../Components/AppComponent/ModalComponent';
import images from '../../Themes/Images';
import { connect } from 'react-redux';
import { updatePasswordApi, updateProfileApi } from '../../services/Api';
import ImageCropPicker from 'react-native-image-crop-picker';

const EditProfile = ({ navigation, userProfileRes, verifyRes }) => {
  const [ nameModalVisible, setNameModalVisible ] = useState(false);
  const [ phoneModalVisible, setPhoneModalVisible ] = useState(false);
  const [ emailModalVisible, setEmailModalVisible ] = useState(false);
  const [ passwordModalVisible, setPasswordModalVisible ] = useState(false);

  const [ name, setName ] = useState(userProfileRes?.name);
  const [ phoneNumber, setPhoneNumber ] = useState(userProfileRes?.phoneNumber);
  const [selectedImage, setSelectedImage] = useState(userProfileRes?.profileUrl)
  const [ email, setEmail ] = useState(userProfileRes?.email);
  const [ oldPassword, setOldPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ updateLoading, setUpdateLoading ] = useState(false);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [errors, setErrors] = useState({});

  const openImageModal = () => {
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
  };
  const handleChoosePhoto = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        // closeImageModal();
        // closeSelectedModal();
        setSelectedImage(image?.path)
        const payload = {
          file: image?.path,
          // accessToken: currentUser?.accessToken,
          // refreshToken: currentUser?.refreshToken,
        };
        console.log(payload)
        // try
        // {
        //   const serverImag = await uploadImageOnServer(payload);
        //   setSelectedImage(serverImag?.data?.contentUrl);
        //   // handleApiCalled()
        // } catch (error)
        // {
        //   console.log('Error uploading image:', error);
        // }
      })
      .catch(error => {
        console.log('Error picking image: ', error);
      });
  };

  const handleTakePhoto = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        // closeImageModal();
        // closeSelectedModal();
      })
      .catch(error => {
        console.log('Error taking photo: ', error);
      });
  };
  const validatePassword = (password) => {
    let errors = {};
    let valid = true;
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
  
    if (!hasMinLength) {
      errors.password = 'Password must be at least 8 characters long';
      valid = false;
    }
  
    if (!hasUpperCase) {
      errors.password = 'Password must contain at least one uppercase letter';
      valid = false;
    }
  
    if (!hasLowerCase) {
      errors.password = 'Password must contain at least one lowercase letter';
      valid = false;
    }
  
    if (!hasNumber) {
      errors.password = 'Password must contain at least one number';
      valid = false;
    }
  
    // Ensure at least one special character
    if (!hasSpecialChar) {
      errors.password = 'Password must contain at least one special character';
      valid = false;
    }
  
    // Optional: Add a check for repeated characters or sequences
    const hasRepeatedChars = /(.)\1{2,}/.test(password); // Avoid sequences like "aaa"
    if (hasRepeatedChars) {
      errors.password = 'Password must not contain repeated characters or sequences';
      valid = false;
    }
  
    // Optional: Check against a list of common passwords (example: "password123")
    const commonPasswords = ['password', '123456', 'qwerty', 'letmein', 'welcome'];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.password = 'Password is too common. Please choose a stronger one';
      valid = false;
    }
  
    return { valid, errors };
  };
  
  const updateProfilewithApi = () => {
    const { valid, errors } = validatePassword(newPassword);

    if (!valid) {
      // Handle validation error (e.g., show a message to the user)
      setErrors({ password: errors.password });
      console.error('Password validation failed:', errors?.password);
      return; 
    }
    const payload = {
      newPassword,
      authToken: verifyRes?.authToken,
    };
    setUpdateLoading(true);

    updatePasswordApi(payload)
    .then(response => {
      console.log('Profile updated successfully:', response);
      setNameModalVisible(false);
      setEmailModalVisible(false);
      setPhoneModalVisible(false);
      setPasswordModalVisible(false);
      setUpdateLoading(false);
      setNewPassword("")
    })
    .catch(error => {
      setErrors({ password: error?.message });
      setUpdateLoading(false);
      console.error(
        'Error updating pass:',
        error.message,
        'Status:',
        error.status,
      );
    });


    // const payload = {
    //   name,
    //   phoneNumber,
    //   email,
    //   oldPassword,
    //   newPassword,
    //   authToken: verifyRes?.authToken,
    // };
    
    // updateProfileApi(payload)
    //   .then(response => {
    //     console.log('Profile updated successfully:', response);
    //     setNameModalVisible(false);
    //     setEmailModalVisible(false);
    //     setPhoneModalVisible(false);
    //     setPasswordModalVisible(false);
    //     setUpdateLoading(false);
    //   })
    //   .catch(error => {
    //     console.error(
    //       'Error updating profile:',
    //       error.message,
    //       'Status:',
    //       error.status,
    //     );
    //   });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={35} color={Colors.black} />
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                {
                  selectedImage? <Image source={{uri:selectedImage}} style={styles.profileImage} /> :
                  <Image source={images.facebook} style={styles.profileImage} />
                }
                {/* <Image source={images.facebook} style={styles.profileImage} /> */}
                {/* <TouchableOpacity
                  style={{ left: 65, top: -20, zIndex: 100 }}
                  onPress={() => {
                    openImageModal();
                  }}>
                  <MaterialCommunityIcons
                    name="image-edit"
                    size={responsiveFontSize(2.5)}
                    color={Colors.black}
                  />
                </TouchableOpacity> */}
              </View>
              <View style={styles.content}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    // onFocus={() => {
                    //   setNameModalVisible(true);
                    // }}
                    value={userProfileRes?.name}
                    placeholder="Name"
                    placeholderTextColor={Colors.gray}
                    editable={false}
                  />
                  {/* <TouchableOpacity onPress={() => setNameModalVisible(true)}>
                    <Icon
                      name="edit"
                      size={responsiveFontSize(2.5)}
                      color={Colors.darkgrey}
                    />
                  </TouchableOpacity> */}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    // onFocus={() => {
                    //   setPhoneModalVisible(true);
                    // }}
                    value={userProfileRes?.phoneNumber}
                    placeholder="Phone Number"
                    placeholderTextColor={Colors.gray}
                    size={responsiveFontSize(2.5)}
                    color={Colors.black}
                    editable={false}
                  />
                  {/* <TouchableOpacity onPress={() => setPhoneModalVisible(true)}>
                    <Icon
                      name="edit"
                      size={responsiveFontSize(2.5)}
                      color={Colors.darkgrey}
                    />
                  </TouchableOpacity> */}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    editable={false}
                    // onFocus={() => {
                    //   setEmailModalVisible(true);
                    // }}
                    placeholder="Email ID"
                    color={Colors.black}
                    placeholderTextColor={Colors.gray}
                  />
                  {/* <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
                    <Icon
                      name="edit"
                      size={responsiveFontSize(2.5)}
                      color={Colors.darkgrey}
                    />
                  </TouchableOpacity> */}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onFocus={() => {
                      setPasswordModalVisible(true);
                    }}
                    placeholder="Change Password"
                    placeholderTextColor={Colors.gray}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordModalVisible(true)}>
                    <Icon
                      name="edit"
                      size={responsiveFontSize(2.5)}
                      color={Colors.darkgrey}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      />

      <ModalComponent
        visible={nameModalVisible}
        onClose={() => {
          updateProfilewithApi();
        }}
        onPressCross={() => setNameModalVisible(false)}
        value={name}
        onChangeText={setName}
        loading={updateLoading}
        placeholder="Rohan"
      />
      <ModalComponent
        visible={phoneModalVisible}
        onClose={() => {
          updateProfilewithApi();
        }}
        onPressCross={() => setPhoneModalVisible(false)}
        value={userProfileRes?.phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="New Phone Number"
        loading={updateLoading}
      />
      <ModalComponent
        visible={emailModalVisible}
        onClose={() => {
          updateProfilewithApi();
        }}
        onPressCross={() => setEmailModalVisible(false)}
        value={userProfileRes?.email}
        onChangeText={setEmail}
        placeholder="New Email ID"
        loading={updateLoading}
      />

      <ModalComponent
        visible={passwordModalVisible}
        onClose={() => {
          updateProfilewithApi();
        }}
        onPressCross={() => {setPasswordModalVisible(false)
          setUpdateLoading(false);
          setErrors({ password:"" });
        }}
        loading={updateLoading}
        title="Change Password"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
        errors={errors?.password}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeImageModal}>
        <View style={styles.modalBackground}>

          <View style={styles.innerModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                closeImageModal();
              }}>
              <Icon name="cross" size={35} color={Colors.black} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.imageIocon}  onPress={() => {
                closeImageModal();
                handleTakePhoto()
              }}>
                <EvilIcons name="camera" size={35} color={Colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageIocon}  onPress={() => {
                closeImageModal();
                handleChoosePhoto()
              }}>
                <MaterialCommunityIcons name="view-gallery" size={35} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.newColor,
  },
  content: {
    marginTop: responsiveHeight(5),
  },
  imageContainer: {
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(11),
    borderWidth: 2,
    padding: 2,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveWidth(11),
    // borderRadius:
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    height: responsiveHeight(8),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'space-between',
  },
  input: {
    width: 280,
    fontSize: FontSize.FS18,
    color:Colors.black
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor:"#fff"
  },
  innerModal: {
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    width: responsiveWidth(100),
    paddingTop: 30,
    paddingBottom:20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // marginTop:100

  },
  imageIocon: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1
  },
  closeButton: {
    // backgroundColor: "green",
    width: 35,
    height: 35,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 200
  },
});

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers?.data,
  userProfileRes: state?.userProfileReducers?.data?.user,
});
export default connect(mapStateToProps)(EditProfile);
