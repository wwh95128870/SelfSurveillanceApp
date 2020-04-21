import React from 'react';
import {View,Text} from 'react-native'
import {styles} from './AppStyle'
import {  Button,Snackbar } from 'react-native-paper';


export default class CameraScreen extends React.Component{

    state = {

    };


    render(){
        const payload = this.props.navigation.getParam("payload","empty");
        return(
            <View style={styles.container}>
                <Text>CameraScreen</Text>
                <Button
                    onPress={() => this.myFunction()}
                >
                    button
                </Button>
            </View>
        )
    }

    myFunction(){
        alert();
        this.props.navigation.goBack();
    }

}


