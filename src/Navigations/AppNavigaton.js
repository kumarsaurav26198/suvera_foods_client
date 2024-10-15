import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductsDescription from '../Screens/ProductsDescription/ProductsDescription';
import BTabNavigation from './BTabNavigation';
import Cart from '../Screens/Cart/Cart';
import Categories from '../Screens/Categories';
import SavedAddresses from '../Screens/SavedAddresses';
import SetLocationMap from '../Screens/SetLocationMap';
import AboutUs from '../Screens/AboutUs';
import EditProfile from '../Screens/EditProfile';
import FillAddress from '../Screens/FillAddress';
import DefaultAddress from '../Screens/DefaultAddress';
import OrderHistory from '../Screens/OrderHistory';
import SupportFAQ from '../Screens/SupportFAQ';
import Notification from '../Screens/Notification';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import OTP_Verify from '../Screens/OTP_Verify';
import PrivacyPolicy from '../Screens/InfoDocuments/PrivacyPolicy';
import TermsOfService from '../Screens/InfoDocuments/TermsOfService';
import CouponScreen from '../Screens/CouponScreen';
import ComboDetails from '../Screens/ProductsDescription/ComboDetails';
import OrderDetails from '../Screens/OrderDetails/OrderDetails';
import { setNavigator } from '../services/navigationService';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const navigationRef = useRef();
  return (
    <NavigationContainer ref={navigationRef} onReady={() => setNavigator(navigationRef.current)}>
      <Stack.Navigator
        initialRouteName="BTabNavigation"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP_Verify"
          component={OTP_Verify}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            title: 'Privacy Policy',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{
            title: 'Terms Of Service',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="BTabNavigation" component={BTabNavigation} />
        <Stack.Screen
          name="ProductsDescription"
          component={ProductsDescription}
        />
        <Stack.Screen
          name="ComboDetails"
          component={ComboDetails}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="CouponScreen" component={CouponScreen} />
        <Stack.Screen
          name="Categories"
          component={Categories}
          // options={{
          //   headerShown: true,
          // }}
        />
        <Stack.Screen
          name="SavedAddresses"
          component={SavedAddresses}
          options={{
            title: 'Saved Addresses',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="SetLocationMap"
          component={SetLocationMap}
          options={{
            title: 'Set Location in Map',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="FillAddress"
          component={FillAddress}
          options={{
            title: 'Fill Address',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DefaultAddress"
          component={DefaultAddress}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SupportFAQ"
          component={SupportFAQ}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
