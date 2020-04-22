import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import { Input } from 'react-native-elements';
import {  Button,Snackbar } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class SentRequestScreen extends React.Component{

    state = {
        message:"",
        errorMessage:"",
        location:{},
        photo:null,
        photoUri:null,
    };

    componentDidMount(){
        this._getLocation();
        
    }

    _getLocation = async()=>{
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        if(status !== "granted"){
            console.log("Permission not granted");
            this.setState({errorMessage:"Permission not granted"})
            alert(this.setState.errorMessage);
        }

        const userLocation = await Location.getCurrentPositionAsync();
        this.setState({
            location : userLocation
        })
        console.log("GPS updated");
    }


    render(){
        let { image } = this.state;

        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon}/></Text>
                        <Text style={styles.appHeader}>Request</Text>
                        <Text style={styles.appHeader}></Text>
                    </TouchableOpacity>
                    <View style={styles.screen}>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputView}>
                                <Input
                                label="Your Message"
                                labelStyle = {styles.inputTitle}
                                placeholder='Your message here'
                                onChangeText={text => this.setState({message:text})}
                                value={this.state.message}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <Input
                                    label = "GPS Location"
                                    labelStyle = {styles.inputTitle}
                                    selectTextOnFocus={false}
                                    value = {this.displayGPSLocation()}
                                />
                            </View>
                            <View>
                                <Button
                                    mode="outlined"
                                    onPress={() => this._getLocation()}
                                >
                                    Update GPS
                                </Button>
                            </View>

                            <View style={styles.inputView}>
                                <Button
                                    mode="outlined"
                                    onPress={() => this.onClickCameraButton()}
                                >
                                    Upload Photo
                                </Button>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Button title="Pick an image from camera roll" onPress={this._pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    onCallBack = data => {
        this.setState(data);
        console.log(JSON.stringify(data));
    };

    displayGPSLocation(){

        var text = JSON.stringify(this.state.location.coords);
        try{
            var coordsObj = JSON.parse(text);
            text = coordsObj.latitude + ":" + coordsObj.longitude;
        }catch{

        }
        return text
    }

    onClickCameraButton(){
        this.props.navigation.navigate("CameraScreen",{
            payload:"{'key':'value'}",
            callBack : this.onCallBack
        });
    }

    submitOnClick(){
        this.setState(state => ({ visible: !state.visible }));
        alert();
    }

}


const inPageStyles = StyleSheet.create({

})

