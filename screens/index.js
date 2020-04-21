import React from 'react'
import Screen from './Screen'
import SettingScreen from './SettingScreen'
import SendRequestScreen from './SentRequestScreen'


export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} name="Profile"/>

export const MessageScreen = ({navigation}) => <Screen navigation={navigation} name="Message"/>

export const ActivityScreen = ({navigation}) => <Screen navigation={navigation} name="Activity"/>

export const Setting = ({navigation}) => <SettingScreen navigation={navigation} name="Setting"/>

export const SendRequest = ({navigation}) => <SendRequestScreen navigation={navigation} name="SendRequest"/>



