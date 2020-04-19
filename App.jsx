import React from 'react';

import {createAppContainer} from "react-navigation";

import {createDrawerNavigator} from "react-navigation-drawer";

import {Dimensions} from "react-native";

import {Feather} from "@expo/vector-icons";

import {
  Setting,
  ProfileScreen,
  MessageScreen,
  ActivityScreen,
  SendRequest
} from "./screens";

const DrawerNavigator = createDrawerNavigator({
  SendRequest,
  Setting,
  ProfileScreen,
  MessageScreen,
  ActivityScreen,
  
})

export default createAppContainer(DrawerNavigator);