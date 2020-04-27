import React from 'react';

import { createAppContainer } from "react-navigation";

import { createDrawerNavigator } from "react-navigation-drawer";

import { Dimensions } from "react-native";

import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from 'react-navigation-stack'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Notifications } from 'expo';

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
import News from './screens/NewsScreen'
import InfectedPerson from './screens/WifiScreen'


const dangerZone = [
  {"longitude":114.1552334,"message":"Danger Zone","latitude":22.3191508},
  {"longitude":114.1552334,"message":"Danger ZoneB","latitude":22.3191508},
]


const TestStack = createStackNavigator({
  Home: StackHome,
  TestStackScreen: TestStackScreen
}, {
  defaultNavigationOptions: {
    //headerShown:false,
  }
})

const TestCameraStack = createStackNavigator({
  Home: CallCameraScreen,
  CameraScreen: CameraScreen
}, {
  defaultNavigationOptions: {
    headerShown: false,
  }
})

const SelfSurveillance = createStackNavigator({
  Home: SendRequest,
  CameraScreen: CameraScreen
}, {
  defaultNavigationOptions: {
    headerShown: false,
  }
})



const DrawerNavigator = createDrawerNavigator({
  News,
  Setting,
  SelfSurveillance,
  InfectedPerson,
})

//export default createAppContainer(DrawerNavigator);

const AppContainer = createAppContainer(DrawerNavigator);



class RootApp extends React.Component {

  state ={
    dangerZoneArray:dangerZone,
    expoPushToken: '',
    notification: {},
    shouldAlert:true,
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Infected Person Nearby',
      body: 'There have Infected Person surrounding, Keep a safe distance',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("Permission not granted");
      this.setState({ errorMessage: "Permission not granted" })
      alert(this.setState.errorMessage);
    }

    const userLocation = await Location.getCurrentPositionAsync();
    this.setState({
      location: userLocation
    })
    //console.log("GPS updated : "+JSON.stringify(this.state.location));
  }


  async checkDangerZone(){
    for(i = 0 ; i < this.state.dangerZoneArray.length ; i++){
      if(this.state.location != null || this.state.coords.location != null){
        if(Math.abs(this.state.location.coords.longitude - this.state.dangerZoneArray[i].longitude) < 0.001 &&  Math.abs(this.state.location.coords.latitude - this.state.dangerZoneArray[i].latitude) < 0.001){
          
          
          if(this.state.shouldAlert){
              this.setState({shouldAlert:false});
              console.log(this.state.dangerZoneArray[i].message);
              alert("There have Infected Person surrounding, Keep a safe distance");
              this.sendPushNotification().then(()=>{
                
              }).catch(()=>{
                console.log("error");
              });
              
          }
          
        }else{
          console.log("szve");
        }
      }
      
    }
  }


  render() {
    this._getLocation();
    this.checkDangerZone();
    return (
      <AppContainer
        ref={navigatorRef => {

        }}
      />
    );
  }
}
export default RootApp;