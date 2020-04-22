import React from 'react';
import {View,Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {styles} from './AppStyle'
import {FontAwesome5} from '@expo/vector-icons'
import {  Button } from 'react-native-paper';
import {CameraScreen} from "./CameraScreen"




export default class CallCameraScreen extends React.Component{

    state = {
        payload:"default",
        photo:null
    };

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                <TouchableOpacity 
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon}/></Text>
                        <Text style={styles.appHeader}> </Text>
                        <Text style={styles.appHeader}> </Text>
                    </TouchableOpacity>
                <View style={styles.screen}>
                <Text>CallCameraScreen</Text>
                <Text>{JSON.stringify(this.state.photo.url)}</Text>
                <Button
                    onPress={
                        () => this.myFunction()
                    }
                >
                    Take Picture
                </Button>
                </View>
                </SafeAreaView>
            </View>
        )
    }

    onCallBack = data => {
        this.setState(data);
    };

    myFunction(){
        this.props.navigation.navigate("CameraScreen",{
            payload:"{'key':'value'}",
            callBack : this.onCallBack
        });
    }

}


