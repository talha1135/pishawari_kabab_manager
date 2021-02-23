import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Splash from '../../screens/Splash';
import Home from '../../screens/Home';
import CookHome from '../../screens/CookHome';
import Account from '../../screens/Account';
import AccountSettings from '../../screens/AccountSettings';
import ChangePassword from '../../screens/ChangePassword';
import OrderDetails from '../../screens/OrderDetails';
import CookOrderDetails from '../../screens/CookOrderDetails';
import RiderOrderDetails from '../../screens/RiderOrderDetails';
import Riders from '../../screens/Riders';
import Login from '../../auth/Login';
import SignUp from '../../auth/SignUp';



const AppContainer = createStackNavigator(
  {
    Splash: Splash,
    
    Riders: Riders,
    OrderDetails: OrderDetails,
    CookOrderDetails: CookOrderDetails,
    RiderOrderDetails:RiderOrderDetails,

    Home: Home,
    CookHome: CookHome,
    Account: Account,
    AccountSettings: AccountSettings,
    ChangePassword: ChangePassword,

    Login: Login,
    SignUp: SignUp,

    
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppNavigator = createAppContainer(AppContainer);

export default AppNavigator;