import React from 'react';
import { AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { styles } from './AppStyle'
import { VALUES } from "../Value"
import { Input } from 'react-native-elements';
import { Button, Snackbar, Checkbox } from 'react-native-paper';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class SentRequestScreen extends React.Component {

    state = {
        message: "",
        location: {},
        photo: null,
        photoUri: null,
        photoName: null,
        symptoms_Cough: false,
        symptoms_CifficultyBreathing: false,
        symptoms_MuscleWeakness: false,
        symptoms_Fever: false,
        user_Name: null,
        user_Phone: null,
        user_Email: null,
        user_Address: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        AsyncStorage.getItem(VALUES.USER.EMAIL, (err, result) => { this.setState({ user_Email: result }) });
        AsyncStorage.getItem(VALUES.USER.NAME, (err, result) => { this.setState({ user_Name: result }) });
        AsyncStorage.getItem(VALUES.USER.ADDRESS, (err, result) => { this.setState({ user_Address: result }) });
        AsyncStorage.getItem(VALUES.USER.PHONE, (err, result) => { this.setState({ user_Phone: result }) });
    }

    componentDidMount() {
        this._getLocation();
    }

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
        console.log("GPS updated");
    }


    render() {
        let { image } = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon} /></Text>
                        
                        <Text style={styles.appHeader}></Text>
                    </TouchableOpacity>
                    <View style={styles.screen}>
                        <Text style={{fontSize:20}}>Self Surveillance</Text>
                        <View style={styles.inputGroup}>
                            
                            <View style={styles.inputView}>
                                <Input
                                    label="Your Message"
                                    labelStyle={styles.inputTitle}
                                    placeholder='Your message here'
                                    onChangeText={text => this.setState({ message: text })}
                                    value={this.state.message}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <Input
                                    label="GPS Location"
                                    labelStyle={styles.inputTitle}
                                    selectTextOnFocus={false}
                                    value={this.displayGPSLocation()}
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
                                    onPress={() => this._takePhoto()}
                                >
                                    Upload Photo
                                </Button>
                            </View>

                            {/* symptoms form */}

                            <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 10, fontWeight: "bold", alignSelf: "flex-start" }}>Symptoms</Text>

                            <View style={styles.inputView}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.text}>Cough</Text>
                                    <Checkbox
                                        status={this.state.symptoms_Cough ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ symptoms_Cough: !this.state.symptoms_Cough }); }}
                                    />
                                </View>

                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.text}>Difficulty breathing</Text>
                                    <Checkbox
                                        status={this.state.symptoms_CifficultyBreathing ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ symptoms_CifficultyBreathing: !this.state.symptoms_CifficultyBreathing }); }}
                                    />
                                </View>

                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.text}>Muscle weakness</Text>
                                    <Checkbox
                                        status={this.state.symptoms_MuscleWeakness ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ symptoms_MuscleWeakness: !this.state.symptoms_MuscleWeakness }); }}
                                    />
                                </View>

                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.text}>Fever</Text>
                                    <Checkbox
                                        status={this.state.symptoms_Fever ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ symptoms_Fever: !this.state.symptoms_Fever }); }}
                                    />
                                </View>
                            </View>



                            <Button mode="contained" onPress={() => { this.sendRequest() }}>Send</Button>

                            {/* <Button onPress={()=>{this.printState()}}>show state</Button> */}
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    sendRequest() {
        console.log(JSON.stringify(this.state));
        fetch('https://awari.algebragame.app/IBM/php/receivePhoneMessage.php', {
            method: 'POST',
            headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "json="+JSON.stringify(this.state),
        })
        .then(response => response.json())
        .then(responseJson => {
            this.setState(
                {

                },
                function () {
                    console.log(responseJson);
                    alert("Success");
                }
            );
        })
        .catch(error => {
            console.error(error);
        });
    }

    printState() {
        console.log(JSON.stringify(this.state));
        alert(JSON.stringify(this.state));
    }

    onCallBack = data => {
        this.setState(data);
        console.log(JSON.stringify(data));
    };

    displayGPSLocation() {

        var text = JSON.stringify(this.state.location.coords);
        try {
            var coordsObj = JSON.parse(text);
            text = coordsObj.latitude + ":" + coordsObj.longitude;
        } catch{

        }
        return text
    }

    submitOnClick() {
        this.setState(state => ({ visible: !state.visible }));
        alert();
    }

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 0.3,
                base64: true,
            });

            if (!pickerResult.cancelled) {
                this.setState({ image: pickerResult.uri });
            }
            console.log(pickerResult.uri);
            this.uploadImageAsync(pickerResult.uri);
        }
    };


    uploadImageAsync(pictureuri) {
        //https://awari.algebragame.app/IBM/uploadImage/upload.php
        //http://192.168.0.100:8080/api/upload.php
        //fileToUpload
        let apiUrl = 'https://awari.algebragame.app/IBM/uploadImage/upload.php';

        console.log(pictureuri);
        var timestemp = new Date().getTime();

        let photoName = timestemp + '.jpg';
        this.setState({ photoName: photoName })


        var data = new FormData();
        data.append('fileToUpload', {
            uri: Platform.OS === "android" ? pictureuri : pictureuri.replace("file://", "") ,
            name: photoName,
            type: 'image/jpg'
        })

        fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: data
        }).then(
            response => {
                console.log('succ ')
                console.log(JSON.stringify(response))
            }
        ).catch(err => {
            console.log('err ')
            console.log(JSON.stringify(err))
        })




    }



}


const inPageStyles = StyleSheet.create({

})

