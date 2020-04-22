import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet} from 'react-native'
import {styles} from './AppStyle'
import {  Button,Snackbar } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome,Ionicons ,MaterialIcons } from '@expo/vector-icons';


export default class CameraScreen extends React.Component{

    state = {
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    render(){
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }else{
            return(
                <View style={styles.container}>
                    <Camera style={inPageStyles.cameraView} type={this.state.cameraType}>
                        <View style={styles.rowSpaceAround}>
                        <Button 
                            onPress={() => this.myFunction()}
                        >
                            <Ionicons name="ios-photos" style={inPageStyles.photoIcon} />
                        </Button>
                        
                        <Button 
                            onPress={() => this.myFunction()}
                        >
                            <FontAwesome name="camera" style={inPageStyles.photoIcon} />
                        </Button>
                        
                        <Button 
                            onPress={() => this.handleCameraType()}
                        >
                            <MaterialIcons name="switch-camera" style={inPageStyles.photoIcon} />
                        </Button>
                        </View>
                    </Camera>
                </View>
            )
        }
    }

    myFunction(){
        this.props.navigation.goBack();
    }

    handleCameraType(){
        const { cameraType } = this.state

        this.setState({cameraType:
            cameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        })
    }
}


const inPageStyles = StyleSheet.create({
    cameraView:{
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems:"center",
    },
    photoIcon:{
        color: "#fff", 
        fontSize:40
    }
})
