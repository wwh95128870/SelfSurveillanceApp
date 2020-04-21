import React from 'react';

import {createAppContainer} from "react-navigation";

import {createDrawerNavigator} from "react-navigation-drawer";

import {Dimensions} from "react-native";

import {Feather} from "@expo/vector-icons";
import {createStackNavigator} from 'react-navigation-stack'

import {
  Stack,
  Setting,
  ProfileScreen,
  MessageScreen,
  ActivityScreen,
  SendRequest
} from "./screens";

import TestStackScreen from './screens/TestStackScreen'
import StackHome from './screens/StackHome'




const RootStack = createStackNavigator({
  Home: StackHome,
  TestStackScreen: TestStackScreen
},{
  defaultNavigationOptions: {
    //header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
  }
})




const DrawerNavigator = createDrawerNavigator({
  RootStack,
  SendRequest,
  Setting,
  ProfileScreen,
  MessageScreen,
  ActivityScreen,
})

export default createAppContainer(DrawerNavigator);