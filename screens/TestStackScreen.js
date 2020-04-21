import React from 'react';
import {View,Text} from 'react-native'
import {styles} from './AppStyle'
import {  Button,Snackbar } from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack'

export default class TestStackScreen extends React.Component{

    state = {

    };


    render(){
        const payload = this.props.navigation.getParam("payload","empty");
        return(
            <View style={styles.container}>
                <Text>page2 with:{payload}</Text>
                <Button
                    onPress={() => this.goBack()}
                >
                    button
                </Button>
            </View>
        )
    }

    goBack(){
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.callBack({ payload: "updated payload here" });
    }

}


