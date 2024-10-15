import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { CommonStyles } from '../../Themes/CommonStyles';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import Auth_Title from '../../Components/Auth_Title';
import Auth_Desc from '../../Components/Auth_Desc';
import { loginRequest } from '../../Redux/Actions/AuthActions';
import { useRoute } from '@react-navigation/native';
import InputMobile from '../../Components/InputMobile';

function SignIn({ navigation, loginReducers }) {
  console.log(loginReducers?.error)
  const route = useRoute();
  const { fromScreen, productPrice } = route?.params || {};
  const dispatch = useDispatch();

  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
  };

  useEffect(() => {
    if (loginReducers?.data === 200) {
      navigation.navigate('OTP_Verify', {
        phoneNumber: `+${selectedCountryCode}${phoneNumber}`,
        fromScreen: fromScreen,
      });
    }
  }, [loginReducers, selectedCountryCode, phoneNumber, navigation]);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleContinue = () => {
    const fullPhoneNumber = `+${selectedCountryCode}${phoneNumber}`;

    if (!selectedCountryCode || !phoneNumber) {
      setError('Please enter a valid country code and phone number.');
      return;
    }

    setError('');
    dispatch(loginRequest({ phoneNumber: fullPhoneNumber }));
  };

  return (
    <View style={CommonStyles.container}>
      <Auth_Title
        red_Text="Enter "
        text_title="your number to keep the farm-fresh meat goodness coming to your doorstep"
      />
      <InputMobile
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your mobile number"
        onCountryChange={handleCountryChange}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      {loginReducers?.error ? <Text style={{ color: 'red', marginBottom: 10 }}>{loginReducers?.error?.message}</Text> : null}
      <C_Button
        title="Continue"
        backgroundColor={Colors.black}
        text_color={Colors.white}
        onPress={handleContinue}
        loading={loginReducers?.loading}
      />
      <Auth_Desc
        text_title="Don't have an account?"
        text_title2=" Sign Up"
        onPressTextTwo={handleSignUp}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loginReducers: state.loginReducers,
});

export default connect(mapStateToProps)(SignIn);
