import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import { Input } from 'react-native-elements';
import {  Button,Snackbar } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class SentRequestScreen extends React.Component{

    state = {
        message:"",
        errorMessage:"",
        location:{}
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
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    displayGPSLocation(){

        var text = JSON.stringify(this.state.location.coords);
        try{
            var coordsObj = JSON.parse(text);
            text = coordsObj.latitude + ":" + coordsObj.longitude;
        }catch{

        }
        return text
    }

    submitOnClick(){
        this.setState(state => ({ visible: !state.visible }));
        alert();
    }

}


const inPageStyles = StyleSheet.create({

})

