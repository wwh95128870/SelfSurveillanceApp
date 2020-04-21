import React from 'react';
import {View,Text} from 'react-native'
import {styles} from './AppStyle'
import {createStackNavigator} from 'react-navigation-stack'

export default class TestStackScreen extends React.Component{

    state = {

    };


    render(){
        const payload = this.props.navigation.getParam("payload","empty");
        return(
            <View style={styles.container}>
                <Text>{payload}</Text>
            </View>
        )
    }


}


