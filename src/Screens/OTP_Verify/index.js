import { View, FlatList, Alert, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { CommonStyles } from '../../Themes/CommonStyles';
import Auth_Title from '../../Components/Auth_Title';
import OTP_Input from '../../Components/OTP_Input';
import C_Button from '../../Components/C_Button';
import Colors from '../../Themes/Colors';
import Auth_Desc from '../../Components/Auth_Desc';
import { connect, useDispatch } from 'react-redux';
import { loginRequest, verifyReq } from '../../Redux/Actions/AuthActions';

function OTP_Verify({  verifyRes, route,navigation }) {
  const { phoneNumber ,fromScreen,productPrice} = route.params;
  console.log("fromScreen=======>>",fromScreen)
  console.log("productPrice=======>>",productPrice)

  const dispatch = useDispatch();
  const [ otpCode, setOTPCode ] = useState('000000');
  const [ isPinReady, setIsPinReady ] = useState(false);
  const [ countdown, setCountdown ] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // console.log("verifyRes========>>>",verifyRes?.data?.authToken)
    if (verifyRes?.data?.authToken) {
      switch (fromScreen) {
        case 'Cart':
          navigation.navigate('Cart', { productPrice });
          break;
        case 'SignUp':
          navigation.navigate('Home',);
          break;
        case 'ProductsDescription':
          navigation.navigate('Cart');
          break;
        case 'Categories':
          navigation.navigate('Home');
          break;
        case 'OTP_Verify':
          navigation.navigate('Home');
          break;
        case 'Home':
          navigation.navigate('Home');
          break;
        case 'Account':
          navigation.navigate('Home');
          break;
        // case 'Tickets':
        //   navigation.navigate('Tickets', { fromScreen: 'Tickets' });
        //   break;
        // case 'Notifications':
        //   navigation.navigate('Notifications');
        //   break;
        default:
          // navigation.navigate('BottomTabNavigation');
          break;
      }
    }
  }, [verifyRes, navigation, fromScreen]);

  const handleVerifyOTP = async () => {
    const payload = {
      phoneNumber: phoneNumber,
      otp: otpCode,
    };
    await dispatch(verifyReq(payload));
  };
  const handleResendCode = async () => {
    await dispatch(loginRequest({ phoneNumber: phoneNumber }));
    setCountdown(29);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 0)
        {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${ minutes < 10 ? '0' : '' }${ minutes }:${ secs < 10 ? '0' : ''
      }${ secs }`;
  };

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <Auth_Title
              red_Text="Enter "
              text_title="the OTP sent to your mobile number to verify your account."
            />
            <OTP_Input
              code={otpCode}
              setCode={setOTPCode}
              maximumLength={6}
              setIsPinReady={setIsPinReady}
            />
               {/* {verifyRes?.error && (
              <Text style={{ color: 'red', marginTop: 10 }}>
                {verifyRes.error}
              </Text>
            )} */}
            <C_Button
              title="Verify OTP"
              backgroundColor={Colors.black}
              text_color={Colors.white}
              disabled={countdown > 0}
              onPress={() => handleVerifyOTP()}
              loading={verifyRes?.loading}

            />
            <Auth_Desc
              text_title="Didn’t receive code yet ?"
              text_title2=" Resend"
              text_color2={countdown > 0 ? Colors.lightRed : null}
              marginTop={20}
              onPressTextTwo={() => handleResendCode()}
            />
            {countdown > 0 && <Auth_Desc text_title2={formatTime(countdown)} />}
          </>
        )}
      />
    </View>
  );
}
const mapStateToProps = (state) => ({
  verifyRes: state?.verifyReducers,
});
export default connect(mapStateToProps)(OTP_Verify);