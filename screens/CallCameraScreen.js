import React from 'react';
import {View,Text,SafeAreaView,TouchableOpacity, Alert} from 'react-native'
import {styles} from './AppStyle'
import {FontAwesome5} from '@expo/vector-icons'
import {  Button } from 'react-native-paper'
import {CameraScreen} from "./CameraScreen"





export default class CallCameraScreen extends React.Component{

    state = {
        payload:"default",
        photo:null,
        photoUri:null,
    };

    componentDidMount(){

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
                        <Text style={styles.appHeader}> </Text>
                        <Text style={styles.appHeader}> </Text>
                    </TouchableOpacity>
                <View style={styles.screen}>
                <Text>CallCameraScreen</Text>
                <Text>{JSON.stringify(this.state.photoUri)}</Text>
                <Button onPress={() => this.onClickCameraButton()}>Take Picture</Button>
                <Button onPress={() => alert(this.takePhotoAndUpload())}>Send Picture</Button>
                </View>
                </SafeAreaView>
            </View>
        )
    }

    onCallBack = data => {
        this.setState(data);
    };

    onClickCameraButton(){
        this.props.navigation.navigate("CameraScreen",{
            payload:"{'key':'value'}",
            callBack : this.onCallBack
        });
    }
    
    onClickSendPictureButton(){
        alert("");
        fetch('https://awari.algebragame.app/IBM/uploadImage/upload.php', {
            method: 'POST',
            headers:{
                "Content-Type": "multipart/form-data",
            },
            body: this.createFormData(this.state.photo)
        })
        .then((res) => {
            alert(JSON.stringify(res));
            console.log(JSON.stringify(res));
        })
        .catch(error => {
          console.error(error);
        })
        .done();
    }



      uploadImageAsync(pictureuri) {
        let apiUrl = 'http://192.168.0.100:8080/api/upload.php';
      
      
      
          var data = new FormData();  
          data.append('photo', {  
            uri: pictureuri,
            name: 'file.jpg',
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
              console.log(response)
            }
            ).catch(err => {
            console.log('err ')
            console.log(err)
          } )
      
      
      
      
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
            allowsEditing: true,
            aspect: [4, 3],
          });
    
          if (!pickerResult.cancelled) {
            this.setState({ image: pickerResult.uri });
          }
    
          this.uploadImageAsync(pickerResult.uri);
        }
      };





}


