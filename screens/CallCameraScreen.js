import React from 'react';
import {View,Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {styles} from './AppStyle'
import {FontAwesome5} from '@expo/vector-icons'
import {  Button } from 'react-native-paper';
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
                <Text>{JSON.stringify(this.state.photo)}</Text>
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

    async takePhotoAndUpload() {

        let localUri = this.state.photo.uri;
        let filename = localUri.split('/').pop();
      
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
      
        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
      
        await fetch('https://awari.algebragame.app/IBM/uploadImage/upload.php', {
          method: 'POST',
          body: formData,
          header: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
            alert(JSON.stringify(res));
            console.log(JSON.stringify(res));
        })
      }

    createFormData = (photo, body) => {
        alert("FormData");
        const data = new FormData();
        console.log(JSON.stringify(this.state.photo));
        data.append("photo", {
          name: "testPhoto.jpg",
          type: 'image/jpg',
          uri:
            photo.uri
            // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
      
        // Object.keys(body).forEach(key => {
        //   data.append(key, body[key]);
        // });
      
        return data;
      };
}


