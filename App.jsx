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
import CallCameraScreen from './screens/CallCameraScreen'
import CameraScreen from './screens/CameraScreen'
import TestUploadPhoto from './screens/testUploadPhoto'


const TestStack = createStackNavigator({
  Home: StackHome,
  TestStackScreen: TestStackScreen
},{
  defaultNavigationOptions: {
    //headerShown:false,
  }
})

const TestCameraStack = createStackNavigator({
  Home: CallCameraScreen,
  CameraScreen: CameraScreen
},{
  defaultNavigationOptions: {
    headerShown:false,
  }
})

const SendRequestStack = createStackNavigator({
  Home: SendRequest,
  CameraScreen: CameraScreen
},{
  defaultNavigationOptions: {
    headerShown:false,
  }
})



const DrawerNavigator = createDrawerNavigator({
  TestUploadPhoto,
  SendRequestStack,
  TestCameraStack,
  TestStack,
  Setting,
  ProfileScreen,
  MessageScreen,
  ActivityScreen,
})

export default createAppContainer(DrawerNavigator);