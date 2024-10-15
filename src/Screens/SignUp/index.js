import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {CommonStyles} from '../../Themes/CommonStyles';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import Auth_Title from '../../Components/Auth_Title';
import Auth_Desc from '../../Components/Auth_Desc';
import InputComponent from '../../Components/InputComponent';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {connect, useDispatch} from 'react-redux';
import {registerRequest} from '../../Redux/Actions/AuthActions';
import InputMobile from '../../Components/InputMobile';

function SignUp({navigation, registerReducers, verifyRes}) {
  const dispatch = useDispatch();

  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('Saurav Kumar');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;

  const handleCountryChange = code => {
    setSelectedCountryCode(code);
  };

  // Validate password criteria
  const validatePassword = password => {
    let errors = {};
    let valid = true;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      valid = false;
    } else if (!hasUpperCase) {
      errors.password = 'Password must contain at least one uppercase letter';
      valid = false;
    } else if (!hasLowerCase) {
      errors.password = 'Password must contain at least one lowercase letter';
      valid = false;
    } else if (!hasNumber) {
      errors.password = 'Password must contain at least one number';
      valid = false;
    } else if (!hasSpecialChar) {
      errors.password = 'Password must contain at least one special character';
      valid = false;
    }

    return {valid, errors};
  };

  // Main form validation
  const validate = () => {
    let valid = true;
    let validationErrors = {};

    // Name validation
    if (!name) {
      validationErrors.name = 'Name is required';
      valid = false;
    }

    // Phone number validation
    if (!selectedCountryCode || !phoneNumber) {
      validationErrors.phoneNumber =
        'Please enter a valid country code and phone number.';
      valid = false;
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      validationErrors.password = passwordValidation.errors.password;
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  // Handle Sign Up action
  const handleSignUpNow = async () => {
    if (validate()) {
      const payload = {
        phoneNumber: `+${fullPhoneNumber}`,
        name: name,
        password: password,
      };
      await dispatch(registerRequest(payload));
    }
  };

  // Handle OTP Navigation
  const handleContinueOTP = () => {
    navigation.navigate('SignIn', {fromScreen: 'SignUp'});
  };

  const handleTermsOfService = () => {
    navigation.navigate('TermsOfService');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  useEffect(() => {
    if (registerReducers?.data?.status === "1") {
      navigation.navigate('OTP_Verify', {
        phoneNumber: `+${fullPhoneNumber}`,
        fromScreen: 'SignUp',
      });
    }
  }, [registerReducers,]);

  useEffect(() => {
    if (verifyRes?.data?.authToken) {
      navigation.navigate('BTabNavigation');
    }
  }, [verifyRes]);

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <Auth_Title
                red_Text="Join"
                text_title=" the Fresh Meats Family and Start Feasting!"
              />
              <InputComponent
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <InputMobile
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your mobile number"
                onCountryChange={handleCountryChange}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <InputComponent
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {registerReducers.error?.message.includes(
                'Duplicate Field Value',
              ) && (
                <Text style={styles.errorText}>Please use another number</Text>
              )}

              <C_Button
                title="Sign Up Now"
                backgroundColor={Colors.black}
                text_color={Colors.white}
                onPress={handleSignUpNow}
                loading={registerReducers?.loading}
              />

              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={{color: '#000'}}>or</Text>
                <View style={styles.line} />
              </View>
              <C_Button title="Continue with OTP" onPress={handleContinueOTP} />

              <View style={styles.bottomContainer}>
                <Auth_Desc text_title="By signing up, you agree to our" />
                <Auth_Desc
                  text_title="and "
                  text_title1="Terms of Service "
                  text_title2="Privacy Policy."
                  marginTop={-2}
                  onPressTextOne={handleTermsOfService}
                  onPressTextTwo={handlePrivacyPolicy}
                />
              </View>
            </>
          );
        }}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  registerReducers: state.registerReducers,
  verifyRes: state?.verifyReducers,
});

export default connect(mapStateToProps)(SignUp);

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(1.5),
    justifyContent: 'space-around',
  },
  line: {
    backgroundColor: Colors.lightgrey,
    height: responsiveHeight(0.3),
    width: '40%',
  },
  bottomContainer: {
    marginBottom: responsiveHeight(6),
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
});
